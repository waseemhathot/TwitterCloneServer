import bcrypt from 'bcryptjs';

export function saltAndHash(password: string, callback: (err: Error, hash: string) => void) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, callback);
    });
}