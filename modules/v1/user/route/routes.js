const userController = require("../controller/userController");
const upload = require("../../../../middleware/multer")
const Auth = require("../controller/userController")
const AuthModel = require("../model/userModel")
const express = require('express');
const router = express.Router();

const userInstance = userController
const userRoute = (app)=>{
    app.post("/v1/user/signup",userInstance.signup);
    app.post("/v1/user/event",userInstance.newEvent);
    app.post("/v1/user/eventRegister",userInstance.eventRegister);
    app.get("/v1/user/event",userInstance.allEvent);
    app.post("/v1/user/cancel",userInstance.cancelRegistration);
    app.post("/v1/user/upCommingEvent",userInstance.upCommingEvent);
    app.get("/v1/user/eventState/:eventId",userInstance.eventState);
    

}
module.exports = userRoute