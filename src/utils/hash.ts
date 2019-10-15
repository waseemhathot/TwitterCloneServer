import bcrypt from 'bcryptjs';

export function saltAndHash(password: string): Promise<string> {
    const hashPromise: Promise<string> = new Promise(async (resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });

    return hashPromise;
}