const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required: true
    },
    tokens: [{
        token: {
          type: String,
       
        },
      }],
    role:
     { type: String, enum: ['user', 'businessOwner'], default: 'user'
        
      },
    loginCount: {
        type: Number,
        default: 0
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
