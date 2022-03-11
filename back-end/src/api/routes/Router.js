import express from "express";
const router = express.Router();


import {
    SearchUser,
    storeAdult,
    storeDose2,
    getAll,
    storeDose3,
    validation,
    storeMinor,
    LoginResp,
    AllCentre,
    CreateCentre,
    signupResp,
    valideDose
} from "../controllers"

// import {
//     CreatUserValidator,
// } from "../middlewares"

router.post("/SearchUser", SearchUser)
router.post("/loginResp", LoginResp)
router.post("/CreateCentre", CreateCentre)
router.post("/signupResp", signupResp)
router.post("/validation/:id", validation)
router.get("/getAll/:id", getAll)
router.get("/getAllcentre", AllCentre)
router.post("/storeAdult", storeAdult)
router.post("/storeDose2", storeDose2)
router.post("/storeDose3", storeDose3)
router.post("/storeMinor", storeMinor)
router.post("/valideDose", valideDose)

export { router }