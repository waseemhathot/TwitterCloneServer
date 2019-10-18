import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserToken } from '../models';
import config, { KnownConfigKey } from '../utils/config';
import { getDb } from '../middleware/store';
import CredentialsStore from '../store/credentials';
import bcrypt from 'bcryptjs';
import UsersStore from '../store/users';

export function initPassport() {
    passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, callback) => {
            const credentialsStore = new CredentialsStore(getDb()!);
            const usersStore = new UsersStore(getDb()!);
            const userCredentials = await credentialsStore.findByEmail(email);

            if (userCredentials) {

                bcrypt.compare(password, userCredentials.password, async (err, res) => {
                    if (res) {

                        const user = await usersStore.findById(userCredentials.id);
                        if (user) {
                            usersStore.updateDate(user.id, Date());

                            callback(null, user, { message: 'succeeded' });
                        }
                        else {
                            callback(null, false, { message: 'failed' });
                        }
                    }
                    else {
                        callback(null, false, { message: 'failed' });
                    }
                });

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
        (jwtPayload: UserToken, callback) =>
            callback(null, jwtPayload),
    ));
}
