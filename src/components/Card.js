import React, { useState } from 'react'

const Card = ({ movie, onClickCard, onClickImage }) => {
    const [hover, setHover] = useState(false)
    const { Poster, Title, Year } = movie

    const handleMouseEnter = () => {
        if (Poster === 'N/A') {
            return false
        }
        setHover(true)
    }

    return (
        <div className={'h-96 cursor-pointer flex flex-col bg-white bg-opacity-10'}>
            <div className={'h-3/4 text-center flex items-center justify-center relative'} onMouseLeave={() => setHover(false)} onMouseEnter={handleMouseEnter}>
                {
                    Poster !== 'N/A' ?(
                        <img  data-testid={'image-test'}  src={Poster} className={'w-full h-full'} alt={Title} />
                    ):(
                        <p>Not found</p>
                    )
                }
                <div onClick={onClickImage} className={`${hover ? 'block' : 'hidden'} bg-gray-500 top-0 bg-opacity-50 absolute h-full w-full flex items-center justify-center`}>
                    <h1 className={'font-bold text-2xl '}>View Poster</h1>
                </div>
            </div>

            <div onClick={onClickCard} className={'p-2 hover:bg-black flex-1 flex flex-col'}>
                <h1 className={'flex-1'}>{Title}</h1>
                <p>{Year}</p>
            </div>
        </div>
    )
}

export default Card