import mongodb from 'mongodb';

export class MongoConnection {
  private client: mongodb.MongoClient | undefined;
  public db: mongodb.Db | undefined;
  private initialized = false;

  constructor(
    public readonly url: string,
  ) { }

  public async connect(): Promise<void> {
    this.client = await mongodb.MongoClient.connect(
      this.url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      },
    );

    this.db = this.client.db();
    this.initialized = true;
  }

  public async close(): Promise<void> {
    if (!this.initialized) return;
    await this.client!.close();
    this.initialized = false;
  }
}
