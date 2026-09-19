import userModel from "../Model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { publishToQueue } from "../broker/rabbit.js";

async function register(req, res) {
  const { email, password, fullname } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    email,

    password: hash,

    fullname: {
      firstName: fullname.firstName,
      lastName: fullname.lastName,
    },
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "2d",
    },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User created successfully",

    user: {
      id: newUser._id,

      email: newUser.email,

      fullname: newUser.fullname,

      role: newUser.role,
    },

    token,
  });
}

async function googleAuthCallback(req, res) {
  const googleUser = req.user;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [
      {
        email: googleUser.emails[0].value,
      },

      {
        googleId: googleUser.id,
      },
    ],
  });

  if (isUserAlreadyExists) {
    const token = jwt.sign(
      {
        id: isUserAlreadyExists._id,
        role: isUserAlreadyExists.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "2d",
      },
    );
    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successfully",

      user: {
        id: isUserAlreadyExists._id,

        email: isUserAlreadyExists.email,

        fullname: isUserAlreadyExists.fullname,

        role: isUserAlreadyExists.role,
      },

      token,
    });
  }

  const newUser = await userModel.create({
    googleId: googleUser.id,

    email: googleUser.emails[0].value,

    fullname: {
      firstName: googleUser.name.givenName,

      lastName: googleUser.name.familyName,
    },
  });
  await publishToQueue("user_created", {
    id: newUser._id,
    email: newUser.email,
    fullname: newUser.fullname,
    role: newUser.role,
  });
  const token = jwt.sign(
    {
      id: newUser._id,
      role: newUser.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn: "2d",
    },
  );

  res.cookie("token", token);

  return res.status(201).json({
    message: "User created successfully",

    user: {
      id: newUser._id,

      email: newUser.email,

      fullname: newUser.fullname,

      role: newUser.role,
    },

    token,
  });
}

export { register, googleAuthCallback };
