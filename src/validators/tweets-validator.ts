import joi from 'joi';

const schema = joi.object().keys({
    text: joi.string().min(1).max(240),
});

export default schema;