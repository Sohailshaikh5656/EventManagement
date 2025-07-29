let database = require("../../../../configure/database")
const responseCode = require("../../../../utilities/responseCode");
const common = require("../../../../utilities/common");
const { OPERATION_FAILED } = require("../../../../utilities/responseCode");
const jwt = require('jsonwebtoken');

require('dotenv').config();


class userModel {
    constructor() { }

    async signup(requestData) {
       try{
        const userData = {
            name : requestData.name,
            email : requestData.email,
        }
        const [userEmail] = await database.query("SELECT * FROm tbl_user WHERE email = ?",[requestData.email])
        if(userEmail.length > 0){
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "email_already_exists",
                data: "User with this email already exists"
            }
        }
        const [result] = await database.query("INSERT INTO tbl_user SET ?",userData);
        if(result.affectedRows<=0){
            return {
                code : OPERATION_FAILED,
                keyword : "Data Not Inseted !",
                data : "Something Wrong in Database and data not Inserted !"
            }
        }
        return{
            code: responseCode.SUCCESS,
            keyword: "user_registered",
            data: {
                message: "User registered successfully",
                user: userData
            }
        }
       }catch (error) {
            console.log("This is Error", error)
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.data || error
            }
        }
    }

    async newEvent(requestData){
        try{
            const newEventData = {
                title:requestData.title,
                date_time : requestData.date_time,
                location : requestData.location,
                capacity : requestData.capacity
            }
            if(new Date(requestData.date_time) < new Date()) {
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "invalid_date_time",
                    data: "Event date and time must be in the future"
                }
            }
            const [result] = await database.query("INSERT INTO tbl_event SET ?",newEventData);
        if(result.affectedRows<=0){
            return {
                code : responseCode.OPERATION_FAILED,
                keyword : "event_not_created",
                data : "Failed to create new event in database"
            }
        }
        let eventId = result.insertId
        return {
            code: responseCode.SUCCESS,
            keyword: "event_created",
            data: {
                message: "Event created successfully",
                eventId: eventId
            }
        }
        }catch(error){
            return {
                code:OPERATION_FAILED,
            keyword: "something_went_wrong",
            data: error.message || "An error occurred while creating new event"
            }
        }
    }

    async eventRegister(requestData){
        try{
            const eventData = {
                user_id : requestData.userId,
                event_id : requestData.eventId
            }
            const [checkUserRegistered] = await database.query("SELECT * FROM tbl_event_registration WHERE user_id=? AND event_id = ? AND is_active=1 AND is_deleted=0",[eventData.user_id, eventData.event_id])
            if(checkUserRegistered.length>0){
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "already_registered",
                    data: "You have already registered for this event"
                }
            }
            const [eventResult] = await database.query("SELECT e.*,(SELECT COUNT(*) FROM tbl_event_registration as er WHERE er.event_id = ? AND e.id = ? AND er.is_active=1 AND er.is_deleted=0) as registeredUser FROM tbl_event as e WHERE e.is_active = 1 ANd e.is_deleted = 0 AND e.id = ?",[eventData.event_id,eventData.event_id,eventData.event_id])
            console.log("Capacity Cape : ",eventResult[0].registeredUser)
            if(eventResult.length<0){
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "no_event_found",
                    data: "No event found for this event id"
                }
            }else if(new Date(eventResult[0].date_time) < new Date()){
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "event_over",
                    data: "This event has already ended"
                }
            }else if(eventResult[0].capacity<=eventResult[0].registeredUser){
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "event_full",
                    data: "This event has reached its maximum capacity"
                }
            }

            const [result] = await database.query("INSERT INTO tbl_event_registration SET ?",eventData)
            if(result.affectedRows<=0){
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "registration_failed",
                    data: "Failed to register for the event"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "registration_successful",
                data: "You have successfully registered for the event"
            }
        }catch(error){
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message || "An error occurred while registering for event"
            }
        }
    }

    async getEvent(requestData){
        try{
            const [result] = await database.query("SELECT * FROM tbl_event WHERE is_active=1 AND is_deleted = 0");
            if(result.length<=0){
                return{
                    code : responseCode.NO_DATA_FOUND,
                    keyword: "no_event_found",
                    data: "No events found"

                }
            }
            const eventData = []
            for(let i = 0; i < result.length; i++) {
                let data = result[i];
                console.log("This is Data : ",data)
                const [userRegister] = await database.query(
                    `SELECT u.* 
                    FROM tbl_user as u 
                    JOIN tbl_event_registration as er ON er.user_id = u.id 
                    WHERE er.event_id = ? AND er.is_active=1 AND er.is_deleted=0 AND u.is_active = 1 AND u.is_deleted=0`, 
                    [data.id]
                );
                data.users = userRegister;  
                eventData.push(data);
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "event_fetched",
                data: eventData
            }
        }catch(error){
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message || "An error occurred while fetching events"
            }
        }
    }

    async cancelRegistration(requestData){
        try{
            const userData = {
                event_id : requestData.eventId,
                user_id : requestData.userId
            }

            const [checkRegistrartion] = await database.query("SELECT * FROM tbl_event_registration WHERE event_id = ? AND user_id = ?",[userData.event_id, userData.user_id])
            if(checkRegistrartion.length<=0){
                return {
                    code: responseCode.NOT_REGISTER,
                    keyword: "not_registered",
                    data: "You have not registered for this event"
                }
            }
            const [result] = await database.query("UPDATE tbl_event_registration SET is_deleted = 1 WHERE event_id = ? AND user_id = ?",[userData.event_id, userData.user_id])
            if(result.affectedRows<=0){
                return {
                    code: responseCode.OPERATION_FAILED,
                    keyword: "registration_not_canceled",
                    data: "Failed to cancel registration"
                }
            }
            return {
                code: responseCode.SUCCESS,
                keyword: "registration_canceled",
                data: "Registration canceled successfully"
            }
        }catch(error){
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message || "An error occurred while canceling registration"
            }
        }
    }
    async upCommingEvent(requestData){
        try{
            let sql = "SELECT * FROM tbl_event WHERE is_active=1 AND is_deleted=0 AND date_time > now()"
            let date = ``;
            let location = ``;
            console.log("req Data : ",requestData)
            if(requestData.location){
                requestData.location = requestData.location.toLowerCase()
                location = `AND location LIKE '%${requestData.location}%'`
                sql += location
            }
            if(requestData.date){
                date = `ORDER BY date_time ASC`
                sql+= date
            }
            const [result] = await database.query(sql);
        if(result.length > 0){
            return {
                code: responseCode.SUCCESS,
                keyword: "upcoming_events_found",
                data: result
            }
        } else {
            return {
                code: responseCode.NO_DATA_FOUND,
                keyword: "no_upcoming_events",
                data: "No upcoming events found"
            }
        }

        }catch(error){
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong", 
                data: error.message || "An error occurred while fetching upcoming events"
            }
        }
    }

    async eventState(requestData){
        try{
            let [result] = await database.query("SELECT e.*, (SELECT COUNT(*) FROM tbl_event_registration as er WHERE er.event_id = e.id) as userRegister FROM tbl_event as e WHERE e.id = ? AND e.is_active=1 AND e.is_deleted = 0",[requestData.eventId])
            if(result.length<=0){
                return {
                    code: responseCode.NO_DATA_FOUND,
                    keyword: "event_not_found",
                    data: "Event not found or inactive"
                }
            }
            result = result[0]
            result.totalRegistrations = result.userRegister,
            result.remainingCapacity=result.capacity - result.userRegister,
            result.percentageCapacity=((result.userRegister / result.capacity) * 100).toFixed(2)
            return{
                code: responseCode.SUCCESS,
                keyword: "event_state_found",
                    data: result
                }
        }catch(error){
            return {
                code: responseCode.OPERATION_FAILED,
                keyword: "something_went_wrong",
                data: error.message || "An error occurred while processing event state"
            }        
        }
    }
}

module.exports = new userModel()