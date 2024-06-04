const service = require('../services/service');
const schema=require('../validation/validationSchema')


async function showjob(req, res) {
  try {
    const job = await service.getJob();
    res.json(job);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to display job.' });
  }
}

async function createJob(req,res){

  const { error, value } =schema.createJob(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
    const newJob=await service.addJob(value)
    res.json(newJob);
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ error: 'Failed to create Job.' });
  }
}

async function deleteJob(req,res) {
 try {
  const jobId=req.params.jobId
  const checkJob= await service.Check(jobId)
  if(!checkJob){
    return res.json({ error: 'Job is not exsisted' });
  }
 const deleteJob=await service.deleteJob(jobId)
  res.json(deleteJob)
}
  catch (error) {
  console.error('Error in controller:', error);
    res.json({ error: 'Failed to delete Job.' });
 }
}

async function updateJob(req,res) {
  //the body must be as {title:"",content:"",city:"",cat:""}

  const { error, value } =schema.createJob(req.body);
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
   const jobId=req.params.jobId
   const checkJob= await service.Check(jobId)
   if(!checkJob){
     return res.json({ error: 'Job is not exsisted' });
    }
   await service.updateJob(value,jobId)
   console.log("updateed is done")
   res.json(value)
 }
   catch (error) {
   console.error('Error in controller:', error);
     res.json({ error: 'Failed to Update Job.' });
  }
 }

 async function createApplyer(req,res) {
  const {error, value}= schema.applyerSchema(req.body)
  if (error){
    return res.status(400).json({ error: error.details[0].message })
  }
  try {
    const jobId=req.params.jobId
    const checkJob= await service.Check(jobId)
    if(!checkJob){
      return res.json({ error: 'Job is not exsisted' });
     }
    const newApplyer= await service.addApplyer(value,jobId)
    res.json(newApplyer)
  } catch (error) {
    console.error('Error in controller:', error);
     res.json({ error: 'Failed to Update applyer.' });
  }
  
 }

module.exports = {
  showjob,
  createJob,
  deleteJob,
  updateJob,
  createApplyer
};

