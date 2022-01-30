const axios = require('axios')
const {Videogame} = require('../db')
const idDb = 700000
const {API, APIKEY} = process.env
const auxImage = 'https://icons.veryicon.com/png/System/iOS7%20Desktop/Games.png'

// const API = "https://api.rawg.io/api/games"
// const APIKEY = "?key=1d8a52e264594dbf954e53e0e830d056"// poner esta info en .env

const get1 = async()=>{
    let get = await axios.get(`${API}${APIKEY}`)
    let data = await get.data.results
    let results = data.map((el)=>{
        return {
              id: el.id,
            name: el.name,
           image: el.background_image,
           genre: el.genres.map((el) => el.name).toString()
    
        }
    })
    return results

}

const get2 = async()=>{
    let get = await axios.get(`${API}${APIKEY}&page=2`)
    let data = await get.data.results
    let results = data.map((el)=>{
        return {
              id: el.id,
            name: el.name,
           image: el.background_image,
           genre: el.genres.map((el) => el.name)
    
        }
    })
    return results

}

const get3 = async()=>{
    let get = await axios.get(`${API}${APIKEY}&page=3`)
    let data = await get.data.results
    let results = data.map((el)=>{
        return {
              id: el.id,
            name: el.name,
           image: el.background_image,
           genre: el.genres.map((el) => el.name)
    
        }
    })
    return results

}

const get4 = async()=>{
    let get = await axios.get(`${API}${APIKEY}&page=4`)
    let data = await get.data.results
    let results = data.map((el)=>{
        return {
              id: el.id,
            name: el.name,
           image: el.background_image,
           genre: el.genres.map((el) => el.name)
    
        }
    })
    return results

}

const get5 = async()=>{
    let get = await axios.get(`${API}${APIKEY}&page=5`)
    let data = await get.data.results
    let results = data.map((el)=>{
        return {
              id: el.id,
            name: el.name,
           image: el.background_image,
           genre: el.genres.map((el) => el.name)
    
        }
    })
    return results

}

const getAll = async()=>{
    let mixer = [];
    let Db = [];
    const getAllDb = await Videogame.findAll();
    Db = getAllDb.map((el)=>{
        return{
            id: el.id+idDb,
            name:el.name,
            description:el.description,
            date: el.date,
            image:el.image,
            rating:el.rating,
            plataforms:el.plataforms,
            genres:"image no found"

        }
    })
    const results = await get1()
    const results2 = await get2()
    const results3 = await get3()
    const results4 = await get4()
    const results5 = await get5()
    mixer = [
        ...Db, 
        ...results, 
        ...results2, 
        ...results3,
        ...results4,
        ...results5
    ]
    return mixer
}

const getFilter = async(name)=>{
    let name1 = name.toLowerCase()
    let mixer = await getAll()
    let filter = mixer.filter((el) => el.name.toLowerCase().includes(name1) )
    if(filter.length === 0){
        return {message :`the ${name} search did not return results`}
    } else {

        return filter.slice(0,15) 
    }

}

const getId = async(id)=>{
    id = parseInt(id)
    if(id > idDb){
        let videogameDb = [];
        let getDbid = await Videogame.findAll({
            where : id-idDb
        })
        videogameDb = getDbid.map((el)=>{
            return{
                id: el.id+idDb,
                name: el.name ,
                description: el.description ,
                date: el.date ,
                rating: el.rating ,
                plataforms: el.plataforms
            }
        }) 
        return videogameDb

    }else{
        let get = await axios.get(`${API}/${id}${APIKEY}`)
        let data = await get.data
        let results = {
            id:   data.id,
            name: data.name,
           image: data.background_image,
           genre: data.genres.map((el) => el.name),
           description: (data.description),
           released: data.released,
           rating: data.rating,
           plataforms: data.platforms.map((el)=> el.platform.name)
          
        
            }
        
        return results

    }
}

const postDb = async(name, description, date, rating, plataforms)=>{
    const message = `the new videogame "${name}" success create `
    const post = await Videogame.create(
        {
            name, 
            description, 
            date, 
            rating, 
            plataforms,
            image : auxImage
        }
    )
    return post

}


module.exports = {
    getAll,
    getFilter,
    getId,
    postDb
}








