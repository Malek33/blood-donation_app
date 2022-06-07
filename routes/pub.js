
const { addPub, getAllPubs, deletePub, getOnePub, getBlood, approvePub, absoluteAllPubs } = require('../controllers/pub.controllers');
const express = require('express');
const isAuthAdmin = require('../middleware/isAuthAdmin');
const userIsAuth = require('../middleware/userIsAuth');
const donorIsAuth = require('../middleware/donorIsAuth');
const router = express.Router();
const { creationValidator, validation } = require("../middleware/pub.validator")

router.get("/", (req, res) => {
    res.send({ message: "test routing" });
});

//get
router.get('/absolute-all', isAuthAdmin, absoluteAllPubs);
router.get('/all', isAuthAdmin, getAllPubs);
router.get('/pubs', isAuthAdmin, getBlood);
router.get('/approve/:id', isAuthAdmin, approvePub);
router.get('/getone/:id', isAuthAdmin, getOnePub);

//post
router.post('/add', donorIsAuth, creationValidator(), validation, addPub);


//delete
router.delete('/delete', isAuthAdmin, deletePub);




function name(params) {
    
}



module.exports = router;