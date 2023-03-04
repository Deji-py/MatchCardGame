import React, { useEffect, useRef, useState } from 'react'

function Timer({ setGameOver, timer, startGame, setStopTimer, setTimer, stopTimer }) {
    const [val, setVal] = useState(0)




    const bar = useRef()


    useEffect(() => {
        const interval =
            setInterval(() => {
                setTimer(timer - 1)
                setVal((timer / 100) * bar.current.clientWidth)
            }, 200)
        if (timer <= 0) {
            setGameOver(true)
            clearInterval(interval)
            setStopTimer(true)
        }
        if (stopTimer === true || startGame === false) {
            clearInterval(interval)
        }
        return () => {
            clearInterval(interval)
        }


    }, [timer, startGame])

    return (
        <div className='w-[40%] shadow-lg h-5 border-2 relative rounded-full overflow-hidden bg-gray-300' ref={bar}>
            <div className=' bg-gradient-to-r rounded-full from-blue-500 to-purple-500' style={{
                width: timer + "%",
                height: "100%",
                transition: "ease all 0.5s"
            }}>
                <p className='absolute top-0 ml-5 text-white text-[0.8rem]'>
                    {timer + "%"}
                </p>
            </div>
        </div>
    )
}

export default Timer