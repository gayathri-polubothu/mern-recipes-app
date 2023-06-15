require("dotenv").config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter= require('./routes/users')
const recipesRouter= require('./routes/recipes')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

const mongodb_connect_url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@recipes-app-cluster.ujp7f4d.mongodb.net/my-recipes-app?retryWrites=true&w=majority`
const mongodb_connect_url2 = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@recipes.cbjcm98.mongodb.net/recipes?retryWrites=true&w=majority`
mongoose.connect(process.env.MONGODB_URL)

app.listen(3040, () => console.log('Server has started'))