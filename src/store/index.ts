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
      userId: 'a75990fe-e387-11e9-b543-2a2ae2dbcce4',
      content: 'Hi I am Katey Perry',
      date: Date(),
      stars: 4,
    },
    {
      id: 'a7599496-e387-11e9-b543-2a2ae2dbcce4',
      userId: 'a759934c-e387-11e9-b543-2a2ae2dbcce4',
      content: 'Hi I am Amanda Seyfried',
      date: Date(),
      stars: 3,
    },
  ],
  users: [
    {
      id: 'a75990fe-e387-11e9-b543-2a2ae2dbcce4',
      name: 'Katy Perry',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnk9A2Vh4b4evt15B0zxz4GKmDAENs08aZeNL9ENiJc0XDdWe_',
    },
    {
      id: 'a759934c-e387-11e9-b543-2a2ae2dbcce4',
      name: 'Amanda Seyfried',
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoOeskvG3R9COrSh_AwlbVXK8ZDOFZing5oErKcLfW6FPQ28qXg',
    },
  ],
  credentials: [
    {
      email: 'amandaseyfried@hotmail.com',
      userHandle: 'Amanda',
      password: 'amanda',
      id: 'a75990fe-e387-11e9-b543-2a2ae2dbcce4',
      roles: [UserRole.User],
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnk9A2Vh4b4evt15B0zxz4GKmDAENs08aZeNL9ENiJc0XDdWe_',
    },
    {
      email: 'katyperry@hotmail.com',
      userHandle: 'Katy',
      password: 'katy',
      id: 'a759934c-e387-11e9-b543-2a2ae2dbcce4',
      roles: [UserRole.User],
      avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoOeskvG3R9COrSh_AwlbVXK8ZDOFZing5oErKcLfW6FPQ28qXg',
    },
  ],
};

export default store;
