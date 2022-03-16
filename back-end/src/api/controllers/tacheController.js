import Adult from "../models/adult";
import Minor from "../models/minor";
import {
    getRegions
} from "../helpers/regions";


// const signup = (req, res) => {

//     const admin = new Admin(req.body);
//     admin.save((err, admin) => {
//         if (err) {
//             return res.status(400).send(err)
//         }
//         res.send(admin)
//     })

// }
const SearchUser = async (req, res) => {
    if (req.body.choice === "adult") {
        const {
            cin,
            date_fin_cin
        } = req.body;
        const data = await Adult.findOne({
            cin: cin
        })
        console.log(data)
        if (data) {
            if (data.dose1 == false) {
                return res.status(200).json({
                    status: true,
                    data:data,
                    msg: "dose1"
                })
            }
            if (data.dose2 == false) {
                return res.status(200).json({
                    status: true,
                    data:data,
                    msg: "dose2"
                })
            }
            if (data.dose3 == false) {
                return res.status(200).json({
                    status: true,
                    data:data,
                    msg: "dose3"
                })
            } else {
                return res.status(200).json({
                    status: true,
                    data:data,
                    msg: "download pass v"
                })
            }
        } else {
            return res.status(200).json({
                status: false,
                msg: "Pas encore Enregistre"
            })
        }
    } else {
        const {
            cne,
        } = req.body;
        const data = await Minor.findOne({
            cne: cne
        }).exec()
        if (data) {
            if (data.dose1 == false) {
                return res.status(400).json({
                    status: false,
                    data:data,
                    msg: "dose1"
                })
            }
            if (data.dose2 == false) {
                return res.status(400).json({
                    status: false,
                    msg: "dose2"
                })
            }
            if (data.dose3 == false) {
                return res.status(400).json({
                    status: false,
                    msg: "dose3"
                })
            } else {
                return res.status(400).json({
                    status: true,
                    msg: "download pass v"
                })
            }
        } else {
            return res.status(400).json({
                status: true,
                msg: "Pas encore Enregistre"
            })
        }
    }

}

const storeAdult = async (req, res) => {

    const {
        nom,
        prenom,
        age,
        covid,
        centre,
        nocovid,
        chronic_disease,
        region,
        cin,
        date_fin_cin
    } = req.body;


    if (req.body.chronic_disease == false) {


        var randomString = Math.random().toString(36).slice(-8);
        var date = new Date()

        if (req.body.covid == true) {
            var dateRdv = date.setDate(date.getDate() + 20)
        } else {
            var dateRdv = date.setDate(date.getDate() + 2)
        }
        const AdultData = {
            nom,
            prenom,
            age,
            chronic_disease,
            covid,
            centre,
            region,
            nocovid,
            cin,
            date_fin_cin,
            hashed_password: randomString,
            rdv: dateRdv
        }
        const adult = new Adult(AdultData);
        adult.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    status: false,
                    mes: err
                })
            }
            return res.status(201).json({
                status: true,
                response: result,
                msg: "successfully created"
            })
        })
    } else {
        const AdultData = {
            nom,
            prenom,
            age,
            covid,
            nocovid,
            region,
            centre,
            chronic_disease,
            cin,
            date_fin_cin,
            dose1: true,
            dose2: true,
            dose3: true,
        }
        const adult = new Adult(AdultData);
        adult.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    status: false,
                    mes: err
                })
            }
            return res.status(201).json({
                status: true,
                response: result,
                msg: "successfully created"
            })
        })
    }
}
const storeDose2 = async (req, res) => {

        var randomString = Math.random().toString(36).slice(-8);
        var date = new Date()

        if (req.body.covid == true) {
            var dateRdv = date.setDate(date.getDate() + 20)
        } else {
            var dateRdv = date.setDate(date.getDate() + 2)
        }

        let doc = await Adult.findOne({ cin: req.params.id });
        doc.hashed_password=randomString;
        doc.rdv=dateRdv;
        doc.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    status: false,
                    mes: err
                })
            }
            return res.status(201).json({
                status: true,
                response: result,
                msg: "successfully updated"
            })
        })
   
}
const storeDose3 = async (req, res) => {

        var randomString = Math.random().toString(36).slice(-8);
        var date = new Date()

        if (req.body.covid == true) {
            var dateRdv = date.setDate(date.getDate() + 20)
        } else {
            var dateRdv = date.setDate(date.getDate() + 2)
        }

        let doc = await Adult.findOne({ cin: req.params.id });
        doc.hashed_password=randomString;
        doc.rdv=dateRdv;
        doc.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    status: false,
                    mes: err
                })
            }
            return res.status(201).json({
                status: true,
                response: result,
                msg: "successfully updated"
            })
        })
   
}
const storeMinor = async (req, res) => {


    const {
        nom,
        prenom,
        age,
        disease,
        chronic_disease,
        cne,
    } = req.body;
    if (req.body.chronic_disease == false) {


        var randomString = Math.random().toString(36).slice(-8);
        var date = new Date()

        if (req.body.disease == true) {
            var dateRdv = date.setDate(date.getDate() + 20)
        } else {
            var dateRdv = date.setDate(date.getDate() + 2)
        }
        const MinorData = {
            nom,
            prenom,
            age,
            chronic_disease,
            disease,
            cne,
            hashed_password: randomString,
            rdv: dateRdv
        }
        const minor = new Minor(MinorData);
        minor.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    status: false,
                    mes: err
                })
            }
            return res.status(201).json({
                status: true,
                response: result,
                msg: "successfully created"
            })
        })
    } else {
        const MinorData = {
            nom,
            prenom,
            age,
            disease,
            chronic_disease,
            cne,
            dose1: true,
            dose2: true,
            dose3: true,
        }
        const minor = new Minor(MinorData);
        minor.save((err, result) => {
            if (err) {
                return res.status(400).send({
                    status: false,
                    mes: err
                })
            }
            return res.status(201).json({
                status: true,
                response: result,
                msg: "successfully created"
            })
        })
    }
}

const valideDose = async (req, res) => {
    if (req.body.cne) {
        try {
            const result = await Minor.findOne({
                cne: req.body.cne
            })
            if (req.body.password === result.hashed_password) {
                if (result.dose1 == false) {
                    result.dose1 = true;
                    result.hashed_password=null
                    result.save()
                    return res.status(201).json({
                        status: true,
                        response: result,
                    })
                }
                if (result.dose2 == false) {
                    result.dose2 = true;
                    result.hashed_password=null
                    result.save()
                    return res.status(201).json({
                        status: true,
                        response: result,
                    })
                }
                if (result.dose3 == false) {
                    result.dose3 = true;
                    result.hashed_password=null
                    result.save()
                    return res.status(201).json({
                        status: true,
                        response: result,
                    })
                }
            }else{
                return res.status(400).json({
                    status: false,
                    msg: "Password not match",
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                msg: "user not found",
            })
        }
       
    } else {
        const {
            cin,
            dateFinCin
        } = req.body;
        try {
            const result = await Adult.findOne({
                cin: cin,date_fin_cin:dateFinCin
            })
            if (req.body.password === result.hashed_password) {
                if (result.dose1 == false) {
                    result.dose1 = true;
                    result.hashed_password=null
                    result.save()
                    return res.status(201).json({
                        status: true,
                        response: result,
                    })
                }
                if (result.dose2 == false) {
                    result.dose2 = true;
                    result.hashed_password=null
                    result.save()
                    return res.status(201).json({
                        status: true,
                        response: result,
                    })
                }
                if (result.dose3 == false) {
                    result.dose3 = true;
                    result.hashed_password=null
                    result.save()
                    return res.status(201).json({
                        status: true,
                        response: result,
                    })
                }
            }else{
                return res.status(400).json({
                    status: false,
                    msg: "Password not match",
                })
            }
        } catch (error) {
            return res.status(400).json({
                status: false,
                msg: "user not found",
            })
        }
       
    }


}
const validation = async (req, res) => {
    try {
        const result = await Adult.findOne({
            _id: req.params.id
        })
        if (req.body.password === result.hashed_password) {
            if (result.dose1 == false) {
                result.dose1 = true;
                result.hashed_password=null
                result.rdv=null
                result.save()
                return res.status(201).json({
                    status: true,
                    response: result,
                })
            }
            if (result.dose2 == false) {
                result.dose2 = true;
                result.hashed_password=null
                result.rdv=null
                result.save()
                return res.status(201).json({
                    status: true,
                    response: result,
                })
            }
            if (result.dose3 == false) {
                result.dose3 = true;
                result.hashed_password=null
                result.rdv=null
                result.save()
                return res.status(201).json({
                    status: true,
                    response: result,
                })
            }
        }else{
            return res.status(400).json({
                status: false,
                msg: "Password not match",
            })
        }
    } catch (error) {
        return res.status(400).json({
            status: false,
            msg: "user not found",
        })
    }


}
const getAll = async (req, res) => {
    
    try {
        const users = await Adult.find({region:req.params.id})
        res.status(200).json({
            status: true,
            users

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}
const getFirstDose = async (req, res) => {
    
    try {
        const users = await Adult.find(
            { $or:[ {dose1:true}, { dose2:true}, { dose3:true} ]}).count()
        res.status(200).json({
            status: true,
            users

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}
const getThirdDose = async (req, res) => {
    
    try {
        const users = await Adult.find({dose3:true}).count()
        res.status(200).json({
            status: true,
            users

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}
const getSecondeDose = async (req, res) => {
    
    try {
        const users = await Adult.find(
            { $or:[ { dose2:true}, { dose3:true} ]}).count()
        res.status(200).json({
            status: true,
            users

        })
    } catch (err) {
        res.status(400).json({
            status: false,
            msg: err
        })
    }
}

export {
    SearchUser,
    storeAdult,
    getAll,
    storeDose2,
    storeDose3,
    storeMinor,
    getFirstDose,
    getSecondeDose,
    getThirdDose,
    valideDose,
    validation
}