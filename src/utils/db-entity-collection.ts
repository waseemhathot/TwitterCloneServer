import mongodb, { FilterQuery } from 'mongodb';
import { OptionalId } from './types';


export interface DbEntitiy {
    id: string;
}

export class DbEntityCollection<T extends DbEntitiy> {

    constructor(private readonly collection: mongodb.Collection) { }

    public async all(removeObjectId = true): Promise<T[]> {
        const projection = removeObjectId ? { _id: 0 } : undefined;
        return await this.collection.find({}, { projection }).toArray();
    }

    public async findById(id: string | mongodb.ObjectID, removeObjectId = true): Promise<T | null> {
        const projection = removeObjectId ? { _id: 0 } : undefined;
        return await this.collection.findOne({ id: id }, { projection });
    }

    public async findOne(filter: FilterQuery<T>, removeObjectId = true): Promise<T | null> {
        const projection = removeObjectId ? { _id: 0 } : undefined;
        return await this.collection.findOne(filter, { projection });
    }

    public async addMany(entities: OptionalId<T>[]): Promise<void> {
        const mappedEntities = entities.map(value => {
            const id = new mongodb.ObjectID();
            return Object.assign({}, value, { _id: id }) as T & { _id: mongodb.ObjectID };
        });
        await this.collection.insertMany(mappedEntities);
    }

    public async addOne(entity: OptionalId<T>): Promise<void> { 
        const id = new mongodb.ObjectID();
        const newEntity = {};
        Object.assign(newEntity, entity, { _id: id }) as T & { _id: mongodb.ObjectID };
        await this.collection.insertOne(newEntity);
    }

    public async deleteById(id: string | mongodb.ObjectID): Promise<boolean> {
        const documentId = new mongodb.ObjectID(id);
        const res = await this.collection.deleteOne({ _id: documentId });
        return !!res.deletedCount;
    }

    public async replace(entity: T , upsert = false): Promise<boolean> { 
        const documentId = new mongodb.ObjectID(entity.id);
        const res = await this.collection.replaceOne({ _id: documentId }, entity, { upsert });
        return !!(res.modifiedCount + res.upsertedCount);

    }
}