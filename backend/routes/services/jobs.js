const express = require('express');
const jobController = require('../../controllers/services/jobs');

const router = express.Router();

router.post('/',jobController.createJob);
router.get('/',jobController.getJobs);
router.get('/:id',jobController.getJob);
router.put('/:id',jobController.updateJob);
router.delete('/:id',jobController.deleteJob);

module.exports = router;