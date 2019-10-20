import joi from 'joi';

const schema = joi.object().keys({
    password: joi.string().regex(/^([a-zA-Z0-9@*#]{8,15})$/),
    email: joi.string().regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/)
});

export default schema;