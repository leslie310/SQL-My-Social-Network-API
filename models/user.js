const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique:true,
            trim:true,
            required: 'Username required',
        },

        email: {
            type: String,
            unique: true,
            required:'Email is required',
            match: [/.+@.+\..+/],
        },
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoguht',
            },
        ],
        
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false,
    }
);
userSchema.virtual('friendCount')
// Getter
.get(function () {
  return this.friend.length;
});

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
