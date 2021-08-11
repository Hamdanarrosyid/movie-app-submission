import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { searchMovie } from '../api';
import { STORE_SEARCH_PARAM } from '../store/actionType';
import Button from './Button';

const Input = styled.input.attrs({
    className: 'p-1 w-full focus:outline-none text-black'
})``

const SearchBar = ({ className, classButton, placeholder, classContainer }) => {
    const [autoComplete, setAutoComplete] = useState([])
    // const [loadSearch, setLoadSearch] = useState(true)
    const searchParam = useSelector(state => state?.searchParam)

    const dispatch = useDispatch()
    const history = useHistory()


    const handleOnChange = async (e) => {
        try {
            const { value } = e.target
            dispatch({ type: STORE_SEARCH_PARAM, payload: value })

            const movies = await searchMovie(value)
            const { Search } = movies.data
            if (Search) {
                setAutoComplete(Search.splice(4, Search.length))
            } else {
                setAutoComplete([])
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleOnSearch = (e) => {
        e.preventDefault()
        const searchText = e.type === 'click' ? e.target.innerText : searchParam
        history.push(`/movies/${searchText}`)
    }


    const searchValue = searchParam || ''
    return (
        <React.Fragment>
            <form onSubmit={handleOnSearch} method={'post'} className={`w-full flex rounded-md overflow-hidden ${classContainer}`}>
                <Button type={'submit'} className={`px-4 ${classButton}`}><FontAwesomeIcon icon={faSearch} size={'sm'} /></Button>
                <Input required value={searchValue} onChange={handleOnChange} className={className} placeholder={placeholder ?? 'what movie do you want to find?'} name={'search'} type={'text'} autoComplete={'off'} />
            </form>
            <div className={'relative'}>
                <div className={'bg-white w-full z-40 absolute mt-2 left-0 text-black rounded-md'}>
                    {
                        autoComplete.length !== 0 && autoComplete.map(result => (
                            <p key={result.imdbID} onClick={handleOnSearch} className={'my-1 p-1 px-5 cursor-pointer hover:bg-black hover:bg-opacity-10'}>{result.Title}</p>
                        ))

                    }
                </div>
            </div>
        </React.Fragment>

    )
}

export default SearchBar