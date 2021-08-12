import axios from "axios"
const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=faf7e5bb&'

const searchMovie = async (title, page = 1) => {
    try {
        const movies = await axios.request(`${url}s=${title}&page=${page}`)
        return movies
    } catch (error) {
        return error
    }
}

const getMovie = async (title) => {
    try {
        const movies = await axios.request(`${url}t=${title}`)
        return movies
    } catch (error) {
        return error
    }
}

export { searchMovie, getMovie }