import mongodb from 'mongodb';
import CredentialsStore from './credentials';
import UsersStore from './users';

export interface RootStore {
  credentials: CredentialsStore;
  users: UsersStore;
}

export default (db: mongodb.Db): RootStore => ({
  credentials: new CredentialsStore(db),
  users: new UsersStore(db),
});
