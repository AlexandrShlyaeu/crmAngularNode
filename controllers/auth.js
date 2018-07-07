const bcrypt = require('bcryptjs')
const User = require('../models/Users')




module.exports.login = function (req, res) {
  res.status(200).json(
    {
      login: {
        email: req.body.email,
        password: req.body.password,
      }
    }
  )
  
}

module.exports.register = async function (req, res) {
  //email + password
  const candidate = await User.findOne({email: req.body.email})
  if (candidate){
    // user is allready exits, trows error
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  }
  else{
    // create user
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    
    // save to database + errorhandling
    try {
      await user.save()
      res.status(201).json(user)
    } 
    catch(e){
      //error
      
    }
  }
}