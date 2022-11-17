require('dotenv').config()
const {validateRegistration} = require('../validations/validate.registration')
const { customer, otp } = require('../models');
const { v4: uuidv4 } = require('uuid')
const { Op } = require("sequelize");
const { hashMyPassword, generateOtp } = require('../utilities');
const { hash } = require('bcrypt');
const {sendEmail} = require('../services/email')




const register = (req, res) => {

    const {error, value } = validateRegistration(req.body)

    if (error != undefined) {
        
        res.status(400).json({
            status: false,
            message: error.details[0].message
        })
    }else{
        const { lastName, firstName, email, phone, password, repeat_password } = req.body;
        const customer_id = uuidv4()
        const otp = generateOtp()
    try{customers.findAll({
        where: {
            [Op.or]: [
                { email: email },
                { phone_number: phone }
              ]
        },
        attributes: ['customer_id', 'title', 'email', 'phone_number']
        })
        .then((data) => {
            if (data.length > 0) throw new Error('Email or phone number already exist')
    
            return hashMyPassword(password) //[hash, salt]
    
        })
        .then(([hash, salt]) =>{
            return customers.create({
                customer_id: customer_id,
                lastName:lastName,
                firstName:firstName,
                email:email,
                phone_number:phone_number,
                password_hash: hash,
                password_salt: salt,
            })
        })
        .then((insertIntoOtpTable)=>{
        
            return otp.create({
                otp:otp,
                email:email,
                phone:phone, 
            })
            
        })
        .then((data3)=>{
            sendEmail(email,'OTP',`Hello ${firstName} ${lastName}, \n Your OTP is ${otp} `)

            res.status(200).send({
                status:true,
                message:'Registration successful,An otp has been sent to your email'
            })
        })
        .catch((err)=>{
            console.log("err1: ", err)
            res.status(400).json({
                status:false,
                message: err.message || "Some error occurred while creating the customer"
            })
        })
        } catch(error){
            console.log("error: ", error)
            res.status(400).json({
                status:false,
                message:error.message || "Some error occurred while creating customer"
            })
        }
    }
}


module.exports ={ register }

    