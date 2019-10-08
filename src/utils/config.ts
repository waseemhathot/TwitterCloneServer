import * as dotenv from 'dotenv';

dotenv.config({path: process.env.DOTENV_CONFIG_PATH});

export enum KnownConfigKey {
    JwtSecret = 'jwt-sign-secret',
    DbServer = 'DB_SERVER',
}

function get(key: string): string {
    return 'mongodb://localhost:27017/twitter-clone';
}

export default {
    get,
};
