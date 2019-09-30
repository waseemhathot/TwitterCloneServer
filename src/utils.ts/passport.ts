import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserToken } from '../models';


export function initPassport() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (userName, password, callback) => {
            const user = store.credentials.find(u => u.email === userName && u.password === password);

            if (user) {
                const { email, roles } = user;
                const tokenPayload: UserToken = { email, roles };
                callback(null, tokenPayload, { message: 'succeeded' });
            } else {
                callback(null, false, { message: 'failed' });
            }
        },
    ));
