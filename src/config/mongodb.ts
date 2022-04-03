import {Collection, MongoClient} from 'mongodb';

const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_DATABASE = process.env.MONGO_DATABASE;

if (!MONGO_HOST || !MONGO_USER || !MONGO_PASSWORD || !MONGO_DATABASE) {
  throw new Error('Missing MONGO_DB environment variables');
}

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

export default {
  client: null as unknown as MongoClient,

  async connect(): Promise<void> {
    this.client = await MongoClient.connect(uri);
  },

  async disconnect(): Promise<void> {
    await this.client.close();
    this.client = null as unknown as MongoClient;
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) await this.connect();
    return this.client.db().collection(name);
  },
};
