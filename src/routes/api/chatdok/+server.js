import { ChatOpenAI } from "langchain/chat_models/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";

const OPENAI_API_KEY=import.meta.env.VITE_OPENAI_API_KEY;

// Dokumentet lastes inn og innholdet splittes opp i mindre biter som indekseres i en vektordatabase
const loader = new PDFLoader("src/lib/docs/budsjett2022.pdf")
const data = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
});

const splitDocs = await textSplitter.splitDocuments(data);
const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY },);
const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo" });
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

// API-endepunktet som tar imot spørsmål og returnerer svar fra dokumentet
export const POST = async  ({ request }) => {
    const body = await request.json();
    console.log("Spørsmål: " + body.query);

    const response = await chain.call({
        query: body.query,
        });
    console.log("Svar: " + response.text);

    return new Response(JSON.stringify({ message: response.text }))
}