import mongodb from 'mongodb';
import { UserToken } from '../models';
import { OptionalId } from '../utils/types';
import { DbEntityCollection } from '../utils/db-entity-collection';

class UsersStore {

    public collection: DbEntityCollection<UserToken>;

    constructor(db: mongodb.Db) {
        this.collection = new DbEntityCollection(db.collection<UserToken>('users'))
        
        this.collection.createIndex({
            userHandle: 1,
        }, true);

        this.collection.createIndex({
            email: 1,
        }, true);
    }

    public all(removeObjectId = true): Promise<UserToken[]> {
        return this.collection.all(removeObjectId);
    }

    public findById(id: string | mongodb.ObjectID): Promise<UserToken | null> {
        return this.collection.findById(id, { _id : 0, email : 0 });
    }

    public  addOne(user: OptionalId<UserToken>): Promise<void> {
        return this.collection.addOne(user);
    }

    public deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        return this.collection.deleteById(id);
    }

    public updateDate(id: string, newDate: string) {
        return this.collection.updateOne(id, {
            $set: { lastLoginDate : newDate }
        });
    }
}

export default UsersStore;