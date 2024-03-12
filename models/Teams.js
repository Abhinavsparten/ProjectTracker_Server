const mongoose = require('mongoose')

//create new schema for Team
const employees=mongoose.model('Employee',{
    name:
    {
        type: String,
        required: true,
        trim:true,
        maxLength:50
        },

        role:{
            type :String ,
            required: true,
            trim:true,
           maxLength:50
        },
    slack:
    {
        type:String,
        unique:true,  
    } , 
    employeeCode:
    {
        type:String
       

       
       
    },
   
})

module.exports={employees}