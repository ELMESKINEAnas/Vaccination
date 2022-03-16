const Centre = require('../models/centre')
const CreateCentre = (req, res) => {

    const centre = new Centre(req.body);
    centre.save((err, centre) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send(centre)
    })
}
const AllCentre = async (req, res) => {

    try {
        const centres = await Centre.find()
        res.status(200).json({
            status: true,
            centres

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }

}
const OneCentre = async (req, res) => {

    try {
        const centre = await Centre.findOne({_id:req.params.id})
        res.status(200).json({
            status: true,
            centre

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }

}
const UpdateCentre = async (req, res) => {

    try {
        await Centre.findOneAndUpdate({ _id: req.params.id }, req.body);

        res.status(200).json({
           status: true,
           message: "updated successfully"
        })
     } catch (e) {
        res.status(400).json({
           status: false,
           message: e.message
        })
     }

}
const DeleteCentre = async (req, res) => {

    try {
        const {
           id,
        } = req.params
  
        await Centre.findOneAndRemove({ _id: id })
        res.status(200).json({
           status: true,
           message: "deleted successfully"
        })
     } catch (e) {
        res.status(400).json({
           status: false,
           message: e.message
        })
     }
}


export {
    AllCentre,
    OneCentre,
    UpdateCentre,
    DeleteCentre,
    CreateCentre
}