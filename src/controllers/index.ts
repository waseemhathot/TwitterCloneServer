import login from './login';
import tweets from './tweets';
import members from './members';
import register from './register';

export default [
    {
        prefix: '/auth/login',
        router: login,
    },
    {
        prefix: '/auth/register',
        router: register,
    },
    {
        prefix: '/tweets',
        router: tweets,
    },
    {
        prefix: '/members',
        router: members,
    }
];