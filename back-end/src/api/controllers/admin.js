const Admin = require('../models/admin')

const signupAdmin = (req, res) => {

    const admin = new Admin(req.body);
    admin.save((err, admin) => {
        if (err) {
            return res.status(400).send(err)
        }
        res.send(admin)
    })

}
const LoginAdmin = (req, res) => {

    const {
        email,
        password
    } = req.body;

    Admin.findOne({
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
    LoginAdmin,
    signupAdmin,
}