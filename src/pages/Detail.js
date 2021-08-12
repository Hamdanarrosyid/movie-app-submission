import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMovie } from '../api'
import NavBar from '../components/NavBar'
import { storeMovie } from '../store/action'

const Detail = () => {
    const [loading, setLoading] = useState(true)
    const stateMovie = useSelector(state => state?.movie)
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

    const rating = () => {
        const helpArray = []
        const rate = parseFloat(stateMovie.imdbRating)
        let rateRound = Math.round(rate / 2), jumlh = 5, sisa = jumlh - rateRound

        for (let index = 0; index < rateRound; index++) {
            helpArray.push(<FontAwesomeIcon icon={faStar} className={'text-yellow-500'} />)
        }

        for (let index = 0; index < sisa; index++) {
            helpArray.push(<FontAwesomeIcon icon={faStar} className={'text-white'} />)
        }

        return helpArray


    }

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
                            <div className={'flex flex-wrap'}>
                                {
                                    stateMovie.Poster !== 'N/A' ? (
                                        <img src={stateMovie.Poster} alt={stateMovie.Title} className={'lg:w-1/3 w-auto md:w-2/4 h-96 text-center mx-auto md:mx-0 pb-5 pr-5'} />
                                    ) : (
                                        <p className={'text-center'}>Not found</p>
                                    )
                                }
                                <div className={''}>
                                    <h1 className={'text-3xl font-bold'}>{stateMovie.Title} - {stateMovie.Year}</h1>
                                    <div className={'flex py-2 py-2 items-center'}>
                                        <label className={'pr-5'}>IMDB Rating </label> {rating()} <p className={'text-gray-500 px-3 text-lg'}>{stateMovie.imdbRating}</p>
                                    </div>
                                    <div className={'flex py-2'}>
                                        <label className={'pr-5'}>Genre</label>
                                        {
                                            stateMovie.Genre.split(',').map((genre, index) => {
                                                return (
                                                    <p key={index}>{(index ? ', ' : '') + genre}</p>
                                                )
                                            }, ',')
                                        }
                                    </div>
                                    <div className={'flex py-2'}>
                                        <label className={'pr-5'}>Language</label>
                                        <p>{stateMovie.Language}</p>
                                    </div>
                                    <div className={'flex py-2'}>
                                        <label className={'pr-5'}>Writer</label>
                                        {
                                            stateMovie.Writer.split(',').map((writer, index) => {
                                                return (
                                                    <p key={index}>{(index ? ', ' : '') + writer}</p>
                                                )
                                            }, ',')
                                        }
                                    </div>
                                    <div className={'flex py-2'}>
                                        <label className={'pr-5'}>Director</label>
                                        {
                                            stateMovie.Director.split(',').map((director, index) => {
                                                return (
                                                    <p key={index}>{(index ? ', ' : '') + director}</p>
                                                )
                                            }, ',')
                                        }
                                    </div>
                                </div>

                            </div>
                            <div>
                                <h1 className={'text-3xl py-4 font-bold'}>Plot</h1>
                                <p>{stateMovie.Plot}</p>
                            </div>
                            <div>
                                <h1 className={'text-3xl py-4'}>Actors</h1>
                                <div className={'flex'}>
                                    {
                                        stateMovie.Actors.split(',').map((actor, index) => {
                                            return (
                                                <p key={index}>{(index ? ', ' : '') + actor}</p>
                                            )
                                        }, ',')
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Detail