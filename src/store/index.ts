import { Tweet, User, UserCredential, UserRole } from '../models';

interface StoreType {
  tweets: Tweet[];
  users: User[];
  credentials: UserCredential[];
}

const store: StoreType = {
  tweets: [
    { 
        id: '60192cf8-483b-42ca-9af4-3af68fee7c4e',
        userID: 'a75990fe-e387-11e9-b543-2a2ae2dbcce4',
        content: 'Hi I am Katey Perry',
        date: Date(),
        stars: 4
    },
    { 
        id: 'a7599496-e387-11e9-b543-2a2ae2dbcce4',
        userID: 'a759934c-e387-11e9-b543-2a2ae2dbcce4',
        content: 'Hi I am Amanda Seyfried',
        date: Date(),
        stars: 3
    },
  ],
  users: [
    {
        id: 'a75990fe-e387-11e9-b543-2a2ae2dbcce4',
        name: 'Katy Perry',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLlc1CumlqdLHKWo__M6I35IAJCXlYVT798H1Xr-pwKvUu6E5o',
    },
    {
        id: 'a759934c-e387-11e9-b543-2a2ae2dbcce4',
        name: 'Amanda Seyfried',
        image: 'https://media.allure.com/photos/58043d48a295ce423e938f79/16:9/w_2560,c_limit/amanda-seyfried-nov16-cover.jpg',
    },
  ],
  credentials: [
    { email: 'AmandaSeyfried', password: 'amanda', userId: 'a75990fe-e387-11e9-b543-2a2ae2dbcce4', roles: [UserRole.User] },
    { email: 'KatyPerry', password: 'katy', userId: 'a759934c-e387-11e9-b543-2a2ae2dbcce4', roles: [UserRole.User] },
  ],
};

export default store;
