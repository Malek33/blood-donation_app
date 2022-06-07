const mongoose = require('mongoose')
const {Schema,model} = mongoose
const pubSchema = new Schema ({
    name:{ type: String, required: true},
    date:{ type: Date, default: Date.now},
    bloodGroup:{ type: String, required: true},
    medicalReport:{ type: String, required: true},
    email:{ type:String, required:true },
    phone: { type: Number, required: true},
    descreption:{ type: String, required: true},
    approved:{ type: Boolean, default: false},
})

module.exports = Pub = model('pub', pubSchema)
