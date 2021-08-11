import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { searchMovie } from '../api'
import Card from '../components/Card'
import Modal from '../components/Modal'
import NavBar from '../components/NavBar'
import { LOAD_MORE_MOVIE, STORE_LOAD_MORE, STORE_SEARCH_RESULT } from '../store/actionType'

var options = {
    root: null,
    rootMargin: "20px",
    threshold: 1.0
};

const Movies = () => {
    const [loading, setLoading] = useState(true)
    const currentPage = useRef(1)
    const loader = useRef(null)
    const [modal, setModal] = useState({ poster: '', open: false })

    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const { search } = useParams()

    const handleClickCard = (title) => {
        history.push(`/detail/${title}`)
    }

    const fetchMovies = useCallback(async (page) => {
        try {
            const movies = await searchMovie(search, page)
            const { Search, totalResults, Response } = movies.data

            if (Response === 'True') {
                dispatch({ type: STORE_SEARCH_RESULT, payload: { data: Search, totalResults: parseInt(totalResults) } })
                setLoading(false)
            }
        } catch (error) {
            dispatch({ type: STORE_SEARCH_RESULT, payload: { data: [], totalResults: 0 } })
            setLoading(false)
            console.log(error)
        }

    }, [dispatch, search])

    const fetchMore = useCallback(async (page) => {
        try {
            const movies = await searchMovie(search, page)
            const { Search, totalResults, Response } = movies.data

            if (Response === 'True') {
                dispatch({ type: STORE_LOAD_MORE, payload: { data: Search, totalResults: parseInt(totalResults) } })
                dispatch({ type: LOAD_MORE_MOVIE, payload: { beingLoad: false } })
            } else {
                dispatch({ type: LOAD_MORE_MOVIE, payload: { completeLoad: true, beingLoad: false } })
            }
        } catch (error) {
            console.log(error)
        }

    }, [dispatch, search])


    const handleObserver = useCallback((entities) => {
        const target = entities[0]

        if (target.isIntersecting) {
            dispatch({ type: LOAD_MORE_MOVIE, payload: { beingLoad: true } })

            currentPage.current++
            fetchMore(currentPage.current)
        }
    }, [dispatch, fetchMore])

    useEffect(() => {
        fetchMovies()
        if (state) {
            if (state.movies.data.length !== 0 && state.movies.totalResults > 5) {
                const observer = new IntersectionObserver(handleObserver, options)
                if (loader.current) {
                    observer.observe(loader.current)
                }
            }
        }

    }, [loading, search, fetchMovies, handleObserver])

    return (
        <div>
            <NavBar />
            <div className={'px-5'}>
                <h1 className={'text-3xl py-5 font-bold'}>{search}</h1>
                <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4'}>
                    {
                        loading ? (
                            <h1>Loading...</h1>
                        ) : state.movies.data.length !== 0 ? (
                            <React.Fragment>
                                {
                                    state.movies.data.map(movie => (
                                        <Card key={movie.imdbID} movie={movie} onClickCard={() => handleClickCard(movie.Title)} onClickImage={() => setModal({ poster: movie.Poster, open: true })} />
                                    ))
                                }
                                <div ref={loader} className={'py-5 col-span-full text-center bg'}>
                                    {
                                        state.loadMore.beingLoad ? <p>Load more...</p> : state.loadMore.completeLoad && <p>You’ve reached the end of the list</p>
                                    }
                                </div>
                            </React.Fragment>
                        )

                            : (
                                <p>Empty</p>
                            )

                    }
                </div>

            </div>
            <Modal open={modal.open} onClose={() => setModal(false)}>
                <img className={'w-full h-screen'} alt={'poster'} src={modal.poster} />
            </Modal>
        </div >
    )
}

export default Movies