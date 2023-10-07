const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('test is working')
}

const registerUser = async (req, res) => {
    try {
        const {nickname, email, password} = req.body;
        // Check if nickname was entered
        if(!nickname) {
            return res.json({
                error: 'nickname is required'
            })
        }
        // Check if password is good
        if(!password || password.length < 6) {
            return res.json({
                error: 'password is required and has to be more than 6 caracters'
            })
        }
        // Check email
        const exists = await User.findOne({email})
        
        if(exists) {
            return res.json({
                error: 'email already exists'
            })
        }

        const hashedPassword = await hashPassword(password)
        // Create user in database
        const user = await User.create({
            nickname,
            email,
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res.json({
                error: 'invalid email'
            })
        }

        const match = await comparePassword(password, user.password)
        if(match) {
        jwt.sign({email: user.email, id: user._id, nickname: user.nickname}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json(user)
        })
        }
        if(!match) {
            res.json({
                error: 'passwords dont match'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}
