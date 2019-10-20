import joi from 'joi';

const schema = joi.object().keys({
    id: joi.string().guid(),
});

export default schema;