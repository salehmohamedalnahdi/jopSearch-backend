const {PrismaClient}=require ('@prisma/client');
const prisma=new PrismaClient();

async function getJob() {
    const getJob = await prisma.job.findMany({
    include: {
      applyers: true
    }
    })
    return getJob;  
}

async function addJob(requestBody){ 
  const newJob = await prisma.job.create({
    data: {
      title:requestBody.title,
      content: requestBody.content,
      city:requestBody.city,
      cat:requestBody.cat,
    },
  });
  return(newJob);
}

async function Check(jobId) {
  const checkjob=await prisma.job.findUnique({
    where: { id: parseInt(jobId) }
  })
  return checkjob;
}

async function deleteJob(jobId){
   const job=await prisma.job.delete({ 
    where: { id: parseInt(jobId)}
  });
  return job;
}

async function updateJob(requestBody,jobId) {
  const job= await prisma.job.updateMany({
    where: { id: parseInt(jobId)},
    data:{
      title:requestBody.title,
      content: requestBody.content,
      city:requestBody.city,
      cat:requestBody.cat
    }
  })
  return job;
}

async function addApplyer(requestBody,jobId){ 
  const newApplyer = await prisma.applyer.create({
    data: {
      name: requestBody.name,
      email: requestBody.email,
      cv: requestBody.cv,
      appler_id: parseInt(jobId),
    }
  });
  return(newApplyer);
}

module.exports = {
  getJob,
  addJob,
  Check,
  deleteJob,
  updateJob,
  addApplyer
};



/* async function getUsersWithAchievements(userId) {
  try {
    const users = await prisma.user.findMany({
      where: { id: userId },
      include: { achievements: true }
    });
    return users;
  } catch (error) {
    console.error('Error displaying portfolio:', error);
    throw new Error('Failed to display portfolio.');
  }
}*/

/*async function deletePortfolio(req,res) {
 try {
  const {email}=req.body
  try {
    const checkUser=await prisma.user.findMany({
      where: { email: email }
    })
  } catch (error) {
    console.error('Error in checkUser controller:', error);
     res.json({ error: 'email is not exsisted' });
  }
  const deleteaAhievement=await prisma.achievement.deleteMany({
    where: { userEmail: email }
   });
  const deleteUser=await prisma.user.delete({ 
    where: { email: email }
  });
  res.json(deleteUser)
}
  catch (error) {
  console.error('Error in user controller:', error);
    res.json({ error: 'Failed to delete portfolio.' });
 }
}*/

/*async function updatePortfolio(req,res) {
  try {
   const {name, email, age ,title,content}=req.body
   try {
    const checkUser=await prisma.user.findMany({
      where: { email: email }
     })
   } catch (error) {
    console.error('Error in checkUser controller:', error);
    res.json({ error: 'email is not exsisted' });
   }
   const updateUser=await prisma.user.updateMany({
    where: { email: email },
    data:{
      name,
      age,
    },
  });
  const updateachievement=await prisma.achievement.updateMany({
   where: { userEmail: email },
   data:{
     title,
     content,
   }
 })
 res.json({message:"updateed is done"})
}
  catch (error) {
  console.error('Error in user controller:', error);
    res.status(500).json({ error: 'Failed to Update portfolio.' });
 }
}*/