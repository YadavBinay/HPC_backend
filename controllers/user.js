const bcrypt = require('bcrypt');
const path = require('path');
const UserModel = require('../models/userModel');
const childModel = require('../models/childModel');
const { userUploadDir } = require('../middlewares/imageUpload');
const { createToken } = require('../services/authentication');
const ChildModel = require('../models/childModel');

async function signup(req, res) {
  const {
    email,
    userName,
    password,
    phoneNumber,
    gender,
    dateOfBirth,
    maritalStatus,
    state,
  } = req.body;
  // Define required fields
  const requiredFields = [
    'userName',
    'email',
    'password',
    'phoneNumber',
    'gender',
    'dateOfBirth',
    'maritalStatus',
    'state',
  ];

  // Function to validate the request body
  function validateRequestBody(reqBody, requiredFields) {
    return requiredFields.filter(field => {
      if (typeof reqBody[field] === 'number') {
        return isNaN(reqBody[field]);
      } else {
        return !reqBody[field] || reqBody[field].trim() === '';
      }
    });
  }

  // Validate the request body
  const missingFields = validateRequestBody(req.body, requiredFields);
  if (missingFields.length > 0) {
    return res.status(400).json({
      msg: `Missing or empty fields: ${missingFields.join(', ')}`,
    });
  }
  let user = await UserModel.findOne({ phoneNumber });
  let user1 = await UserModel.findOne({ userName });

  if (user)
    return res.status(404).json({ msg: 'This phoneNumber is already used' });
  if (user1)
    return res.status(404).json({ msg: 'This userName is already used' });
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await UserModel.create({
      email: email,
      userName: userName.toLowerCase(),
      phoneNumber: phoneNumber,
      password: hashedPassword,
      gender: gender,
      dateOfBirth: new Date(dateOfBirth), //  dateOfBirth is a string like '27 Oct 2004'
      maritalStatus: maritalStatus,
      state: state,
      profilePicture,
    });
  } catch (e) {
    return res.status(500).json({ msg: 'problem to create user', error: e });
  }

  const token = createToken(user);

  return res
    .status(200)
    .json({ msg: 'User created', token, userName, userId: user._id });
}

async function login(req, res) {
  const { userName, password } = req.body;
  if (!userName) {
    return res.status(404).json({ msg: 'Enter UserName' });
  }
  if (!password) {
    return res.status(404).json({ msg: 'Enter Password' });
  }
  const user = await UserModel.findOne({ userName: userName.toLowerCase() });

  if (!user)
    return res.status(404).json({ msg: 'User not found with this userName' });

  const comparPassword = await bcrypt.compare(password, user.password);

  // if (password !== user.password) return res.status(401).json({ msg: 'Wrong password' });
  if (!comparPassword) return res.status(401).json({ msg: 'Wrong password' });

  const token = createToken(user);
  return res.status(200).json({ token, userName, userId: user._id });
}
async function uploadProfilePic(req, res) {
  let profilePicture = '';
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ msg: 'userId not provided' });
  }
  if (req.file) {
    profilePicture = path.join(
      userUploadDir,
      `${req.file.filename}`
    );
  }
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: userId }, // The filter should be an object
      { profilePicture: profilePicture },
      { new: true } // This option returns the updated document
    );
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const response = {
      msg: 'Profile picture updated',
      picPath: profilePicture,
      userId,
    };
    console.log(response);
    return res.status(200).json(response);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ msg: 'Error updating profile picture', error: e });
  }
}

async function getProfilePic(req, res) {
  const { userId } = req.body;
  console.log(userId, ' :requested profile pic');

  if (!userId) {
    return res.status(400).json({ msg: 'userId not provided to get pp' });
  }

  try {
    const user = await UserModel.findById(userId);
    if (!user || !user.profilePicture) {
      return res.status(404).json({ msg: 'Profile picture not found' });
    }
    console.log(user);
    // Ensure the user is authorized to access this file
    // Add your authorization logic here
    console.log('performing fiile operataion');
    const filePath = path.join(__dirname,"../", user.profilePicture);
    console.log('filepath:::>', filePath); // Output the resolved file path for debugging
    console.log('sending file >>');
    res.sendFile(filePath);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ msg: 'Error retrieving profile picture', error: e });
  }
  finally{
    console.log("file operation finished")
  }
}

async function userDetails(req, res) {
  let userId = req.body.user ? req.body.user._id : undefined;
  if (!userId) {
    return res.status(400).json({ msg: 'Pass a userId' });
  }
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ msg: 'User Not Found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function allUsers(req, res) {
  try {
    const users = await UserModel.find({});
    if (!users) {
      return res.status(401).json({ msg: 'Users Not Found' });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  signup,
  login,
  userDetails,
  allUsers,
  uploadProfilePic,
  getProfilePic,
};
