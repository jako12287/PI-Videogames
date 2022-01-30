const axios = require('axios')
const {Genres} = require('../db')
const {APIG, APIKEY} = process.env

const getGenres = async()=>{
    const getGenres = await axios.get(`${APIG}${APIKEY}`)
    const data = await getGenres.data.results
    const results = data.map((el)=>{
            return{
                name:el.name
            }
    })
    return results
}

const saveDataBase = async()=>{
    const getGenres = await axios.get(`${APIG}${APIKEY}`)
    const data = await getGenres.data.results
    let save =  data.map((el)=>{
        Genres.create({
            name:el.name
        })
    })

    return save

}
const question = async()=>{
    let exists = await Genres.findAll()
    if(exists.length === 0){
        let get = await getGenres()
        saveDataBase() 
        return get
    }else{
    
        return exists
    
    }

}





module.exports = {
    question
}