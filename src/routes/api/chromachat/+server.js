import { ChatOpenAI } from "langchain/chat_models/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from "langchain/vectorstores/faiss";
import { RetrievalQAChain } from "langchain/chains";

const OPENAI_API_KEY=import.meta.env.VITE_OPENAI_API_KEY;

const loader = new PDFLoader("src/lib/docs/budsjett2022.pdf")
const docs = await loader.load();

// Sett inn FAISS her
// Load the docs into the vector store
const vectorStore = await FaissStore.fromDocuments(
  docs,
  new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY })
);

export const POST = async  ({ request }) => {
    const body = await request.json();
    console.log("Spørsmål: " + body.query);

  // Search for the most similar document
  const resultOne = await vectorStore.similaritySearch("body.query", 3);
  console.log(resultOne);


const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo" });
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());


    const response = await chain.call({
        query: body.query,
        });
    console.log("Svar: " + response.text);

    return new Response(JSON.stringify({ message: response.text }))
}