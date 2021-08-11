import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

const NavBar = () => {

    return (
        <div className={'p-5 flex justify-between items-center'}>
            <div>
                <Link to={'/'} className={'text-2xl font-bold cursor-pointer'}>Movie App</Link>
            </div>
            <div>
                <SearchBar className={'bg-transparent text-md text-white px-2'} placeholder={'find your favorite movie'} classContainer={'bg-white bg-opacity-10'} />
            </div>
        </div>
    )
}

export default NavBar