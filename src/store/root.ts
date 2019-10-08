import mongodb from 'mongodb';
import CredentialsStore from './credentials';

export interface RootStore {
  credentials: CredentialsStore;
}

export default (db: mongodb.Db): RootStore => ({
  credentials: new CredentialsStore(db),
});
