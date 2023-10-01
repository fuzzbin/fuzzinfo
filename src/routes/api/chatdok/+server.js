import { ChatOpenAI } from "langchain/chat_models/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";

const OPENAI_API_KEY=import.meta.env.VITE_OPENAI_API_KEY;
const loader = new PDFLoader("src/lib/docs/orden.pdf")

const data = await loader.load();
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 100,
});

const splitDocs = await textSplitter.splitDocuments(data);
const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY },);
const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo" });
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

export const GET = async  ({ request }) => {

    const response = await chain.call({
        query: "Kan jeg bruke snus?",
        });
    console.log(response);
    return new Response(JSON.stringify({ message: response.text }))
}

