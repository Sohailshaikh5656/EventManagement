const middleware = require("../../../../middleware/validation")
const { decryptPlain } = require("../../../../utilities/encryption")
const validationRules = require("../../../../utilities/rules")
const userModel = require("../model/userModel")

class userController {
     constructor() {

     }
     async signup(req, res) {
          try {
               let requestData = req.body
               const newUser = validationRules.newUser
               const { error, value } = newUser.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.sendResponse(req, res, { error: details[0].message })
               }

               let message = await userModel.signup(requestData);
               return middleware.sendResponse(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.sendResponse(req, res, error.message)
          }
     }
     async newEvent(req, res) {
          try {
               let requestData = req.body
               const newUser = validationRules.newEvent
               const { error, value } = newUser.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.sendResponse(req, res, { error: details[0].message })
               }

               let message = await userModel.newEvent(requestData);
               return middleware.sendResponse(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.sendResponse(req, res, error.message)
          }
     }
     async allEvent(req, res) {
          try {
               let requestData = req.body
               let message = await userModel.getEvent(requestData);
               return middleware.sendResponse(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.sendResponse(req, res, error.message)
          }
     }
     async eventRegister(req, res) {
          try {
               let requestData = req.body
               const newUser = validationRules.newRegistration
               const { error, value } = newUser.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.sendResponse(req, res, { error: details[0].message })
               }

               let message = await userModel.eventRegister(requestData);
               return middleware.sendResponse(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.sendResponse(req, res, error.message)
          }
     }
     async cancelRegistration(req, res) {
          try {
               let requestData = req.body
               const cancelRegistration = validationRules.cancelRegistration
               const { error, value } = cancelRegistration.validate(requestData)
               if (error) {
                    console.log("Validation Error :", error.details)
                    return middleware.sendResponse(req, res, { error: details[0].message })
               }

               let message = await userModel.cancelRegistration(requestData);
               return middleware.sendResponse(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.sendResponse(req, res, error.message)
          }
     }

     async upCommingEvent(req, res) {
          try {
               let requestData = req.body
               let message = await userModel.upCommingEvent(requestData);
               return middleware.sendResponse(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.sendResponse(req, res, error.message)
          }
     }

     async eventState(req, res) {
          try {
               let requestData = {}
               requestData.eventId = req.params.eventId
               let message = await userModel.eventState(requestData);
               return middleware.sendResponse(req, res, message)
          } catch (error) {
               console.log("Something went Wrong : ", error.message)
               return middleware.sendResponse(req, res, error.message)
          }
     }
}

module.exports = new userController()