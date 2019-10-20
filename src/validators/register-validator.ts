import joi from 'joi';

const schema = joi.object().keys({
    password: joi.string().regex(/^([a-zA-Z0-9@*#]{8,15})$/),
    userHandle: joi.string().regex(/^[A-Za-z0-9_-]{3,16}$/),
    email: joi.string().regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/),
    avatarUrl: joi.string().allow('').regex(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/),
});

export default schema;