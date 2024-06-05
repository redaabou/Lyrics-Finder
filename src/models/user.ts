import mongoose from "mongoose";
const schema = mongoose.Schema

// utilisateur
const userSchema = new schema(
    {
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
          },
          message: props => `${props.value} is not a valid email!`
        },
      },

      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    { timestamps: true }
);

  const User = mongoose.model("User", userSchema);
  
  export {userSchema}