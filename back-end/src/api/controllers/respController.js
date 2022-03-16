const Resp = require('../models/resp')

const signupResp = (req, res) => {

    const resp = new Resp(req.body);
    resp.save((err, resp) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send(resp)
    })

}
const LoginResp = (req, res) => {

    const {
        email,
        password
    } = req.body;

    Resp.findOne({
        email
    }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                isLogged: false,
                error: 'User not Found with this email@'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                isLogged: false,
                error: 'Email and Password dont Match !'
            })
        }

        return res.status(200).json({ isLogged: true,user })
    })


}

const AllRespo = async (req, res) => {

    try {
        const respos = await Resp.find()
        res.status(200).json({
            status: true,
            respos

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }

}
const OneRespo = async (req, res) => {

    try {
        const respo = await Resp.findOne({_id:req.params.id})
        res.status(200).json({
            status: true,
            respo

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }

}
const UpdateRespo = async (req, res) => {

    try {
        await Resp.findOneAndUpdate({ _id: req.params.id }, req.body);

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
const DeleteRespo = async (req, res) => {

    try {
        const {
           id,
        } = req.params
  
        await Resp.findOneAndRemove({ _id: id })
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
    LoginResp,
    AllRespo,
    OneRespo,
    UpdateRespo,
    DeleteRespo,
    signupResp,
}