const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Username must be unique!',
        trim: true

    },
    email: {
        type: String,
        required: 'Email address must be unique!',
        unique: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Email was not valid!']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    }
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;