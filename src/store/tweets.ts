import mongodb from 'mongodb';
import { Tweet } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class TweetsStore {

    public collection: DbEntityCollection<Tweet>;

    constructor(db: mongodb.Db) {
        this.collection = new DbEntityCollection(db.collection<Tweet>('tweets'))
    }

    public all(removeObjectId = true): Promise<Tweet[]> {
        return this.collection.all(removeObjectId, { postDate: -1 });
    }

    public findById(id: string | mongodb.ObjectID): Promise<Tweet | null> {
        return this.collection.findById(id);
    }

    public add(tweets: OptionalId<Tweet>[]): Promise<void> {
        return this.collection.addMany(tweets);
    }

    public addOne(tweet: OptionalId<Tweet>): Promise<void> {
        return this.collection.addOne(tweet);
    }

    public deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        return this.collection.deleteById(id);
    }

    public replace(tweet: Tweet, upsert = false) {
        return this.collection.replace(tweet, upsert);
    }
}

export default TweetsStore;