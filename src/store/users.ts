import mongodb from 'mongodb';
import { UserToken } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class UsersStore {

    public collection: DbEntityCollection<UserToken>;

    constructor(db: mongodb.Db) {
        this.collection = new DbEntityCollection(db.collection<UserToken>('users'))
    }

    public all(removeObjectId = true): Promise<UserToken[]> {
        return this.collection.all(removeObjectId);
    }

    public findById(id: string | mongodb.ObjectID): Promise<UserToken | null> {
        return this.collection.findById(id);
    }

    public add(users: OptionalId<UserToken>[]): Promise<void> {
        return this.collection.addMany(users);
    }

    public addOne(user: OptionalId<UserToken>): Promise<void> {
        return new Promise(async (resolve, reject) => {
            const users: UserToken[] = await this.all();
            const checkDuplicateUserHandle = users.find(o => o.userHandle === user.userHandle);

            if(!checkDuplicateUserHandle) {
                await this.collection.addOne(user);
                resolve();
            } 
            reject(409);
        });
    }

    public deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        return this.collection.deleteById(id);
    }

    public replace(user: UserToken, upsert = false) {
        return this.collection.replace(user, upsert);
    }
}

export default UsersStore;