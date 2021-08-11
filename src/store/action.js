import { STORE_MOVIE } from "./actionType";

const storeMovie = (payload) => ({
    type: STORE_MOVIE,
    payload
})

export { storeMovie }