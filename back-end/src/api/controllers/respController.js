const Resp = require('../models/resp')
const Centre = require('../models/centre')

const signupResp = (req, res) => {

    const resp = new Resp(req.body);
    resp.save((err, resp) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send(resp)
    })

}
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
export {
    LoginResp,
    AllCentre,
    signupResp,
    CreateCentre
}