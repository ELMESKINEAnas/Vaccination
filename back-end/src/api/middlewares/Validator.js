
const CreateValidator = (req, res, next) => {
    req.check('nom', 'Nom is Required !')
        .notEmpty();

    req.check('prenom', 'Prenom is Required !')
        .notEmpty();

    req.check('cin', 'CIN is Required !')
        .notEmpty();

    req.check('cne', 'CNE is Required !')
        .notEmpty();

    const errors = req.validationErrors()
    if (errors) {
        return res.status(400).json({error:errors[0].msg})
    }
    next()
}
export { CreateValidator }
