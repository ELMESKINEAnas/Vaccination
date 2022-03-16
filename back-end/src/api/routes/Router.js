import express from "express";
const router = express.Router();


import {
    SearchUser,
    storeAdult,
    storeDose2,
    getAll,
    storeDose3,
    validation,
    getFirstDose,
    getSecondeDose,
    getThirdDose,
    storeMinor,
    LoginResp,
    LoginAdmin,
    signupAdmin,
    AllRespo,
    OneRespo,
    UpdateRespo,
    DeleteRespo,
    AllCentre,
    CreateCentre,
    signupResp,
    OneCentre,
    UpdateCentre,
    DeleteCentre,
    valideDose
} from "../controllers"


router.post("/SearchUser", SearchUser)
router.post("/validation/:id", validation)
router.post("/valideDose", valideDose)
router.get("/getAll/:id", getAll)
//Admin Auth
router.post("/LoginAdmin", LoginAdmin)
router.post("/signupAdmin", signupAdmin)
// Responsable
router.post("/loginResp", LoginResp)
router.post("/signupResp", signupResp)
router.get("/AllRespo", AllRespo)
router.get("/OneRespo/:id", OneRespo)
router.post("/UpdateRespo/:id", UpdateRespo)
router.delete("/DeleteRespo/:id", DeleteRespo)
//Centre
router.post("/CreateCentre", CreateCentre)
router.get("/getAllcentre", AllCentre)
router.get("/OneCentre/:id", OneCentre)
router.post("/UpdateCentre/:id", UpdateCentre)
router.delete("/DeleteCentre/:id", DeleteCentre)
//Stat
router.get("/getThirdDose", getThirdDose)
router.get("/getFirstDose", getFirstDose)
router.get("/getSecondeDose", getSecondeDose)
router.post("/storeDose2/:id", storeDose2)
router.post("/storeDose3/:id", storeDose3)*
//Store New User
router.post("/storeAdult", storeAdult)
router.post("/storeMinor", storeMinor)


export { router }