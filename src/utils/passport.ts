import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserToken } from '../models';
import config, { KnownConfigKey } from '../utils/config';
import store from '../store';

export function initPassport() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        (userName, password, callback) => {
            const user = store.credentials.find(u => u.email === userName && u.password === password);
            //where connecting to database and fetching password and email will be
            if (user) {
                const { userHandle, roles, id, avatarUrl } = user;
                const tokenPayload: UserToken = { userHandle, roles, id, avatarUrl};
                callback(null, tokenPayload, { message: 'succeeded' });
            } else {
                callback(null, false, { message: 'failed' });
            }
        },
    ));

    passport.use(new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get(KnownConfigKey.JwtSecret),
        },
        // in this case the user token is actually the same as jwtPayload
        // can consider simply passing jwtPayload, however it might be stale (common though)
        // trade-off: lightweight token vs. required info for most API's to reduce user re-query needs
        (jwtPayload: UserToken, callback) =>
            callback(null, jwtPayload),
    ));
}
