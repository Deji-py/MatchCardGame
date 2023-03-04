import React, { useEffect, useState } from 'react'

function Card({ value, onClick, onDoubleClick }) {
    const [show, setShow] = useState(false)


    function playAudio(url) {
        new Audio(url).play();
    }
    const handleCard = () => {
        setShow(true)
        onClick()
        playAudio("https://notification-sounds.com/soundsfiles/Card-flip-sound-effect.mp3")
    }

    useEffect(() => {
        if (value === null) {
            setShow(false)
        }
        else {
            setShow(true)
        }

    }, [value])
    return (
        <div onClick={handleCard} onDoubleClick={() => { return }} className='bg-white cursor-pointer w-24 h-24 flex justify-center items-center border-2 shadow-sm shadow-gray text-[3rem]' style={{
            transform: show ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "ease 0.5s all"
        }}>
            {value === null ? (value) : (
                <img src={value} style={{
                    width: "80%",
                    height: "80%",
                    objectFit: "contain"
                }} />
            )}
        </div>
    )
}

export default Card