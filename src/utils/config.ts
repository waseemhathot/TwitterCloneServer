export enum KnownConfigKey {
    JwtSecret = 'jwt-sign-secret',
}

function get(key: string): string {
    // TODO: implement properly
    return 'your_jwt_secret';
}

export default {
    get,
};
