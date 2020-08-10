const mongoose = require('mongoose');
const router = require('express').Router();
const Consultation = mongoose.model('Consultation');
const User = mongoose.model('User');
const auth = require('../auth');
const _ = require('lodash')
const moment = require('moment')
const createError = require('http-errors')
const timezone = require('../../helper/timezone')
const { isBadRequest } = require('../../helper/errorCheck')

router.post('/create', create);
router.get('/record/:id', auth.required, getDetailRecord);
router.get('/simplyRecords', auth.required, getSimplyRecords);

async function create(req, res, next) {
    try {
        var consultation = new Consultation(req.body);
        consultation.save()
        return res.json(consultation.toJSON())
    } catch (err) {
        next(err)
    }
}

/**
 * Return Detail record of a consultation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getDetailRecord(req, res, next) {
    try {
        var id = req.params.id;
        isBadRequest(id, 'id')
        
        const record = await Consultation.findOne({_id: id})
        return res.json(record)
    } catch (err) {
        next(err)
    }
}

/**
 * Return a list of consultation records
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function getSimplyRecords(req, res, next) {
    try {
        var {clinic,start,end} = req.query
        isBadRequest(clinic, 'clinic')
        isBadRequest(start, 'start')
        isBadRequest(end, 'end')        
    
        const records = await Consultation.find({
            clinic: clinic,
            createdAt: {
                $gte: start,
                $lt: end
            }}, {
                id:1,
                start:1,
                end:1,
                clinic:1,
                doctor:1,
                patient:1,
            });
    
        var groupByReocords = _.groupBy(records, function(record) {
            return moment(record.start).format('YYYY-MM-DD')
        })
        return res.json(groupByReocords)
    } catch (err) {
        next(err)
    }
}

module.exports = router;