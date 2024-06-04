const Joi = require('joi');


const createJob=(requestBody)=>{
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        city: Joi.string().required(),
        cat: Joi.string().required(),
      });
      return schema.validate(requestBody)
}
const applyerSchema=(requestBody)=>{
  const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      cv: Joi.string(),
      
    });
    return schema.validate(requestBody)
}
module.exports={createJob,applyerSchema}
