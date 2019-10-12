import * as dotenv from 'dotenv';

dotenv.config({path: process.env.DOTENV_CONFIG_PATH});

export enum KnownConfigKey {
    JwtSecret = 'JWT_SECRET',
    DbServer = 'DB_SERVER',
}

// export function getDbServer(): string {
//     return KnownConfigKey.DbServer;
// }

function get(key: string, fallback = ''): string {
    return process.env[key] || fallback;
}

// export function getJwtSecret(): string {
//     return KnownConfigKey.JwtSecret;
// }

// export function getDbUrl(): string {
//     return KnownConfigKey.DbUrl
// }


export default {
    get,
};
