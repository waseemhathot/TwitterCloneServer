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

    public findManyByUserId(id: string) {
        return this.collection.findMany({ userId: id }, { postDate: -1 })
    }

    public addOne(tweet: OptionalId<Tweet>): Promise<void> {
        return this.collection.addOne(tweet);
    }

    public async toggleStarsByUserId(tweetId: string, userId: string): Promise<Tweet> {
        const tweet: Tweet | null = await this.findById(tweetId);
        if (tweet) {

            const checkAlreadyStarred = tweet.starsByUserId.findIndex(o => o === userId);
            if (checkAlreadyStarred >= 0) {

                tweet.starsByUserId.splice(checkAlreadyStarred, 1);
                await this.collection.updateOne(tweet.id, {
                    $set: { starsByUserId: tweet.starsByUserId }
                });
                return tweet;
            }

            tweet.starsByUserId.push(userId);

            await this.collection.updateOne(tweet.id, {
                $set: { starsByUserId: tweet.starsByUserId }
            });
            
            return tweet;
        }
        
        return Promise.reject(404);
    }

    public deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        return this.collection.deleteById(id);
    }
}

export default TweetsStore;