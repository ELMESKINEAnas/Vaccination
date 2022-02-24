const mongoose = require('mongoose');
const minorSchema = new mongoose.Schema({
  nom: {
    type: String,
    trim: true,
    required: true,
  },
  prenom: {
    type: String,
    trim: true,
    required: true,
  },
  cne: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  chronic_disease: {
    type: String,
    trim: true,
    required: true,
  },
  disease: {
    type: Boolean,
    required: true,
  },
  age: {
    type: Number,
    trim: true,
    required: true,
  },
  rdv:{
    type:Date,
    default:null,
  },
  dose1:{
    type:Boolean,
    default:false,
  },
  dose2:{
    type:Boolean,
    default:false,
  },
  dose3:{
    type:Boolean,
    default:false,
  },
  Centre:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Centre',
  },
  region:{
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    default:null,
  }
}, {
  timestamps: true
},{collection:"minors"});
module.exports = mongoose.model('Minor',minorSchema);