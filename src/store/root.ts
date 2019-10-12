import mongodb from 'mongodb';
import CredentialsStore from './credentials';
import UsersStore from './users';
import TweetsStore from './tweets';

export interface RootStore {
  credentials: CredentialsStore;
  users: UsersStore;
  tweets: TweetsStore;
}

export default (db: mongodb.Db): RootStore => ({
  credentials: new CredentialsStore(db),
  users: new UsersStore(db),
  tweets: new TweetsStore(db),
});
