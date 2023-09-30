import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";

// Document loader and text splitter and vector store
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RetrievalQAChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

const OPENAI_API_KEY=import.meta.env.VITE_OPENAI_API_KEY;

const loader = new CheerioWebBaseLoader("https://no.wikipedia.org/wiki/Vestfold_og_Telemark");
// const loader = new PDFLoader("$lib/docs/rpba.pdf")
const data = await loader.load();

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

const splitDocs = await textSplitter.splitDocuments(data);
const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY },);
const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
const relevantDocs = await vectorStore.similaritySearch("Hvilke kommuner finner jeg i Vestfold og Telemark?");

console.log(relevantDocs.length);

const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY, modelName: "gpt-3.5-turbo" });
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

const response = await chain.call({
  query: "Når ble Vestfold fylke opprettet?",
});
console.log(response);

export const siNoe = async () => {
    return "Hey hey hey!" // chatCompletion.data.choices[0].text;
}