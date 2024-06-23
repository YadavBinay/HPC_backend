const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();
const {
  upload,
  permanentStorage,
  userUploadDir,
} = require('../middlewares/imageUpload');
const bodyParser = require('body-parser');
const { connectMongoDb } = require('../Connection/mongoDbConnection');

// Connection
connectMongoDb(process.env.MONGO_CONNECTION_URL).then(() =>
  console.log('Mongodb connected')
);

const UserModel = mongoose.model(
  'testuser',
  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure you provide a single file upload middleware
app.post(
  '/',
  upload(permanentStorage(userUploadDir)).single('profilePicture'),
  async (req, res) => {
    try {
      const { name } = req.body;
      const profile = req.file.path;

      const user = await UserModel.create({
        name,
        profile,
      });

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Endpoint to list all users and show their profile picture
app.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    let userList = users
      .map(user => {
        const profileUrl = `http://localhost:4000/${user.profile}`;
        return `<div>
                <p>${user.name}</p>
                <img src="${profileUrl}" alt="Profile Picture" style="width:150px;height:150px;">
              </div>`;
      })
      .join('');
    res.send(`<div>${userList}</div>`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log('Server running on port 4000 🏦'));
