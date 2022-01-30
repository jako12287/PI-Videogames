const express = require('express')
const {question} = require('../utils/Genres_controllers')
const genres = express.Router();

genres.get('/', async(req, res)=>{
    try {
        let results = await question()
        res.send(results)
    } catch (err) {
        res.send(err)
    }   
})   

module.exports = genres; 