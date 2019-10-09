import mongodb from 'mongodb';
import { UserCredential, User } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class CredentialsStore {

    public collection: DbEntityCollection<UserCredential>;

    constructor(db: mongodb.Db) {
        this.collection = new DbEntityCollection(db.collection<UserCredential>('credentials'))
    }

    public all(removeObjectId = true): Promise<UserCredential[]> {
        return this.collection.all(removeObjectId);
    }

    public findById(id: string | mongodb.ObjectID): Promise<UserCredential | null> {
        return this.collection.findById(id);
    }

    public add(credentials: OptionalId<UserCredential>[]): Promise<void> {
        return this.collection.addMany(credentials);
    }

    public addOne(credential: OptionalId<UserCredential>): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const credentials: UserCredential[] = await this.all();
            const checkDuplicateEmail = credentials.find(o => o.email === credential.email);

            if(!checkDuplicateEmail) {
                await this.collection.addOne(credential);
                resolve();
            } 
            reject(409);
        });
    }

    public deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        return this.collection.deleteById(id);
    }

    public replace(credential: UserCredential, upsert = false) {
        return this.collection.replace(credential, upsert);
    }
}

export default CredentialsStore;

