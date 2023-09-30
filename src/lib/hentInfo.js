// import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

// Document loader and text splitter and vector store
// import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { EPubLoader } from "langchain/document_loaders/fs/epub";


const OPENAI_API_KEY=import.meta.env.VITE_OPENAI_API_KEY;

// const loader = new CheerioWebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/");
// const loader = new PDFLoader("src/lib/docs/orden.pdf")
const loader = new EPubLoader("src/lib/docs/budsjett2022.epub");
const data = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
chunkSize: 1000,
chunkOverlap: 200,
});

const splitDocs = await textSplitter.splitDocuments(data);
const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY },);
const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
const relevantDocs = await vectorStore.similaritySearch("Hvilke kommuner finner jeg i Vestfold og Telemark?");

console.log(relevantDocs.length);

const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo" });
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

const response = await chain.call({
    query: "Hva den totale inntekten?",
    });
    console.log(response);

export const chatResponse = async (question) => {
    const response = await chain.call({
    query: question,
    });
    console.log(question);
    console.log(response);
    return response;
}
