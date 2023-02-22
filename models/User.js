const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    password:{
        type: String,
        required: true,
        trim: true,
        lowercase:true,
    },
    gender:{
        type: String,
        required: true,
    },
    birthDate: {
        type: Date
    },
    img:{
        type: Buffer
    },
    tokens:[{
        token:{type :String}
    }],
    favList:{
        movies:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movies'
        }],
        series:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Series'
        }]
    }
},{timestamps: true}
)



// Hash the plain text password before saving
// userSchema.pre('save', async function (next) {
//     const user = this
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8)
//     }
//     next()
// })


// Hash the plain text password before saving [bcrypt]
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password =  CryptoJS.AES.encrypt(user.password, process.env.HashPassword).toString()
    }
    next()
});

// For Login by bcrypt
userSchema.statics.isLogin = async (email, password) => {
        const user = await User.findOne({ email })
        if (!user) throw new Error('Wrong Email')
    
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error('Wrong Password')
    
        return user
}

//For Login by CryptoJS
// userSchema.statics.isLogin = async (email, password) => {
// const user = await User.findOne({ email })
// if (!user) throw new Error('Wrong Email')

// const bytes  =  CryptoJS.AES.decrypt(user.password, process.env.HashPassword);
// const originalPassword =  bytes.toString(CryptoJS.enc.Utf8);
// if (originalPassword !== password) throw new Error('wrong Password')

// return user
// }

//For Token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRETUSER)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User =  mongoose.model('User', userSchema)

module.exports = User