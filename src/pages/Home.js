import React from 'react'
import SearchBar from '../components/SearchBar'

const Home = () => {

    return (
        <div className={'jumbotron flex items-center justify-center'}>
            <div className={'w-full md:w-3/5 relative -top-20 px-5'}>
                <div className={'text-center md:text-left'}>
                    <h1 className={'font-bold text-3xl text-orange'}>Movie App</h1>
                    <p className={'font-medium py-5'}>This movie application for assessment</p>
                </div>
                <div>
                    <SearchBar className={'text-lg md:text-xl md:p-4'} classButton={'bg-white'} />
                </div>
            </div>
        </div>
    )
}

export default Home