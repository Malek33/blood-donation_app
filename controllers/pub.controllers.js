const Pub = require('../models/Pub')
const Donor = require("../models/Donor");
const jwt = require("jsonwebtoken");

exports.addPub = async(req, res) => {
    try {
        // email unique
        const findPub = await Pub.findOne({ email: req.body.email })
        if (findPub) {
            //res : input
            return res.status(400).send({ msg: 'publication is already exists', findPub })
        }
        const newPub = new Pub(req.body)
        await newPub.save()
        res.status(200).send({ msg: 'publication added succesfully', newPub })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.absoluteAllPubs = async(req, res) => {

    try {
        const allPubs = await Pub.find()
        res.status(200).send({ msg: 'all Pubs : ', allPubs })

    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getAllPubs = async(req, res) => {

    try {
        const allPubs = await Pub.find({ approved: req.body.approved = true })
        res.status(200).send({ msg: 'all approved Pubs : ', allPubs })

    } catch (err) {
        res.status(500).send(err)
    }
}

exports.getBlood = async(req, res) => {
    try {
        const token = req.headers["authorization"];
        const decoded = jwt.verify(token, "bHo2uSC2wD");
        console.log(decoded)
        const user = await Donor.find({ _id: decoded.id })
        const allPubsBloodGroup = await Pub.find({ bloodGroup: user[0].bloodGroup, approved: req.body.approved = true })
        res.status(200).send({ msg: 'all Pubs that contain your blood group : ', allPubsBloodGroup })

    } catch (err) {
        res.status(500).send(err)
    }
}

exports.deletePub = async(req, res) => {

    try {
        const deletedPub = await Pub.deleteOne({ _id: req.params.id })
        res.status(200).send({ msg: 'Pub deleted ' })

    } catch (err) {
        res.status(500).send(err)
    }

}

exports.getOnePub = async(req, res) => {

    try {
        const deleteById = await Pub.findById({ _id: req.params.id })
        res.status(200).send({ msg: 'Pub found', deleteById })
    } catch (err) {
        res.status(500).send(err)
    }
}

exports.approvePub = async(req, res) => {

    try {
        const approveById = await Pub.findById({ _id: req.params.id })
        approveById.approved = true
        await approveById.save();
        res.status(200).send({ msg: 'Pub approved', approveById })
    } catch (err) {
        res.status(500).send(err)
    }
}