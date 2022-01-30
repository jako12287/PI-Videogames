const express = require('express')
const {getAll, getFilter, getId, postDb} = require('../utils/Videogames_controllers')
const videogames = express.Router()
videogames.use(express.json())
// get con query
videogames.get('/', async(req, res, next)=>{
     const {name} = req.query;
     if(!name){
         next()

     } else {
        const filterQuery = await getFilter(name)
         res.send(filterQuery)

     } 
})
//get all db y api
videogames.get('/', async(req, res)=>{
    try {
        const getAll1 = await getAll(); 
        res.send(getAll1)
        
    } catch (err) {
        console.log(err)
    }
} )

videogames.get('/:id', async(req, res)=>{
    try {
        const {id} = req.params
        const videogameId = await getId(id) 
        res.json(videogameId)
        
    } catch (err) {
        res.send(err)
    }
})

videogames.post('/', async(req, res)=>{
    try {
        const {name, description, date, rating, plataforms} = req.body;
        const videogamePost = await postDb(name, description, date, rating, plataforms)
       res.send(videogamePost)
        
    } catch (err) {
        res.send(err)
    }
})





module.exports = videogames;
