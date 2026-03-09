import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    //google login
    googleId: {
      type: String,
    },
    //github login
    githubId: {
      type: String,
    },
    // avatar: {
    //   type: String,
    // },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //(!true) -> false -> skip the block
    //if password change skip if block  and move to the hash--> '' -> "123"
    // password is modified from nothing to '12345678'
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
