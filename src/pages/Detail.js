import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMovie } from '../api'
import NavBar from '../components/NavBar'
import { storeMovie } from '../store/action'

const Detail = () => {
    const [loading, setLoading] = useState(true)
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const { search } = useParams()

    const fetchMovie = useCallback(async () => {
        try {
            const movie = await getMovie(search)
            dispatch(storeMovie(movie.data))
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }, [dispatch, search])

    useEffect(() => {
        fetchMovie()
    }, [loading, search, fetchMovie])
    return (
        <div>
            <NavBar />
            <div className={'p-5'}>
                {
                    loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <div className={'flex'}>
                                <img src={state.movie.Poster} alt={state.movie.Title} className={'w-2/5 h-96'} />
                                <div className={'px-5'}>
                                    <h1 className={'text-3xl font-bold'}>{state.movie.Title} - {state.movie.Year}</h1>
                                </div>
                            </div>
                            <div>
                                <h1 className={'text-3xl py-4 font-bold'}>{state.movie.Title} - {state.movie.Year}</h1>
                                <p>{state.movie.Plot}</p>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Detail