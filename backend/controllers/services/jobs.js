const HttpError = require('../../helpers/http-error');
const db = require('../../models');


const Job = db.jobs;

exports.createJob = async (req,res,next) => {};
exports.getJobs = async (req,res,next) => {
    
    let jobs;
    try {
          jobs = await Job.findAll();
    }catch(err) {
        return next(
            new HttpError('could find job',500)
        )
    }
    res.status(200).json({jobs});
};
exports.getJob = async (req,res,next) => {
    const id = req.params.id; 
    let job;
    try {
          job = await Job.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could find job',500)
        )
    }
    res.status(200).json({job});
};
exports.updateJob = async (req,res,next) => {
    const id = req.params.id; 
    let job;
    try {
          job = await Job.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could find job',500)
        )
    }
    let updatedJob;
    try {
         updatedJob = await Job.upsert({
             id:id
         })
    }catch(err) {
        return next(
            new HttpError('could not update job',500)
        ) 
    }
    res.status(201).json({
        job:updatedJob
    })
};
exports.deleteJob = async (req,res,next) => {
    const id = req.params.id; 
    let job;
    try {
          job = await Job.findByPk(id);
    }catch(err) {
        return next(
            new HttpError('could find job')
        )
    }
    if(job){
        await job.destroy();
    }
    res.status(200).json({
        message:'job deleted'
    })
};