const {checkSchema} = require('express-validator')

const productvalidator = checkSchema({
name : {
    in: 'body',
    isEmpty : false,
    isString : true,
  }
})

module.exports = {productvalidator}