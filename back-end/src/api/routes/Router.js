import express from "express";
const router = express.Router();


import {
    SearchUser,
    storeAdult,
    storeMinor,
    LoginResp,
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
router.post("/storeAdult", storeAdult)
router.post("/storeMinor", storeMinor)
router.post("/valideDose", valideDose)

export { router }