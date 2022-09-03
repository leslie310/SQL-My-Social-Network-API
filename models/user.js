const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique:true,
            trim:true,
            required: true,
        },

        email: {
            type: String,
            unique: true,
            required:true,
            match: [/.+@.+\..+/],
        },
        
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        
        friends: [
            {
                type:Schema.Types.ObjectId,
                ref: 'user',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            
          },
          id: false,
    }
);
userSchema.virtual('friendCount')
// Getter
.get(function () {
  return this.friends.length;
});

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
