const {checkSchema} = require("express-validator")

const signupvalidator = checkSchema({
  username :{
    in : 'body',
    isEmpty : false,
    isString : true
  },
    firstname : {
        in : 'body',
    isEmpty : false,
    isString : true
    },

     lastname : {
    in : 'body',
    isEmpty : false,
    isString : true
   },
     password : {
        in : 'body',
        isEmpty : false,
        isString : true,
        isLength: {
            options : {
                minLength : 2,
                maxLength : 12
            }
        }
     },
      age : {
        in : 'body',
       isNumeric:{
         minValue : 18
       }
      }
})

const signinvalidator = checkSchema({
  username :{
    in : 'body',
    isEmpty : false,
    isString : true
  },
  password : {
    in : 'body',
    isEmpty : false,
    isString : true,
    isLength: {
        options : {
            minLength : 2,
            maxLength : 12
        }
    }
 },
  password : {
        in : 'body',
        isEmpty : false,
        isString : true,
        isLength: {
            options : {
                minLength : 2,
                maxLength : 12
            }
        }
     },

})

module.exports = {signupvalidator, signinvalidator}