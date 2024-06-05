const express= require('express')
const router = express.Router();
const controller=require('../controller/controllers.js')

router.get("/jobs",controller.showJob)
router.get("/jobs/:cat",controller.filterJob)
router.post('/create',controller.createJob);
router.delete("/delete/:jobId",controller.deleteJob)
router.patch("/update/:jobId",controller.updateJob)
router.post('/applyer/:jobId',controller.createApplyer);

module.exports = router;

