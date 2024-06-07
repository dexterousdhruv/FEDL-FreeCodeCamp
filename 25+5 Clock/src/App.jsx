import { useEffect, useRef, useState } from 'react'
import { ArrowUp, ArrowDown, RefreshCw, Play, Pause, Heart } from 'lucide-react'
import beep from './assets/beep.mp3'

function App() {
  const defaultDisplay = 25 * 60
  const defaultSession = 25 * 60
  const defaultBreak = 5 * 60
  const [displayTime, setDisplayTime] = useState(defaultDisplay)
  const [sessionTime, setSessionTime] = useState(defaultSession)
  const [breakTime, setBreakTime] = useState(defaultBreak)
  const [timerOn, setTimerOn] = useState(false)  
  const [onBreak, setOnBreak] = useState(false)  
  const audioRef = useRef(null)
 
  useEffect(() => {
    if (displayTime <= 0) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
      setOnBreak(prev => !prev)
    }
  }, [displayTime])


  const getTime = time => {
    const mins = Math.floor(time / 60)
    const secs = time % 60
    
    return {
      mins,
      secs,
      duration : (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs)
    }
  }


  const startStopTimer = () => {
    if (timerOn) {
      clearInterval(localStorage.getItem('interval-id'))
      setTimerOn(false)
    }

    else if (!timerOn) {
      setTimerOn(true)
      let onBreakVar = onBreak
      let intervalId = setInterval(() => {
        setDisplayTime(prev => {
          if (prev === 0 && !onBreakVar) {
            onBreakVar = true
            console.log('break went', onBreakVar)
              return breakTime 
            
          }
          else if (prev === 0 && onBreakVar) {
            onBreakVar = false
            console.log('session went', onBreakVar)
            return sessionTime
          }
          else  return prev - 1
        })
        
      }, 1000)
      localStorage.clear()
      localStorage.setItem('interval-id', intervalId)
    }
  }
  

  const resetTime = () => {
    setSessionTime(defaultSession)
    setBreakTime(defaultBreak)
    setDisplayTime(defaultDisplay)
    setOnBreak(false)
    setTimerOn(false)
    
    clearInterval(localStorage.getItem('interval-id'))
    audioRef.current.currentTime = 0
    audioRef.current.pause()
  }
  
  const sessionIncrement = (amount) => {
    setSessionTime(prev => {
      return prev < 3600 ?  prev + amount : prev
    })
    if(!onBreak)
      setDisplayTime( sessionTime < 3600 ? sessionTime + amount : sessionTime)
  }

  const sessionDecrement = amount => {
    setSessionTime(prev => {
      return prev >= 120 ?  prev + amount : prev
    })
    if(!onBreak)
      setDisplayTime( sessionTime >= 120 ? sessionTime + amount : sessionTime)

  }

  const breakIncrement = (amount) => {
    setBreakTime(prev => {
      return prev < 3600 ?  prev + amount : prev
    })
    if(onBreak)
      setDisplayTime(breakTime < 3600 ? breakTime + amount : breakTime)
  }

  const breakDecrement = (amount) => {
    setBreakTime(prev => {
      return prev >= 120 ?  prev + amount : prev
    })
    if(onBreak)
      setDisplayTime(breakTime >= 120 ? breakTime + amount : breakTime)
  }


  return (
    <div className='bg-velvet w-full h-screen text-coffee'>
      <div className=" flex items-center justify-center flex-col h-screen gap-y-8 min-[500px]:gap-y-12 lg:gap-y-16">
        <h1 className="text-3xl min-[500px]:text-4xl sm:text-5xl text-lavender-dark font-semibold text-center "> 25 + 5 Clock</h1>
        <div className=" flex justify-between gap-x-5 min-[400px]:gap-x-12 sm:gap-x-20 text-sm">
         
        <div className="min-[400px]:text-lg sm:text-xl lg:text-[28px]">
            <h3 id={`break-label`} className='tracking-wide mb-2 lg:mb-4' >Break Length</h3 >
            <div className='flex justify-center items-center gap-2.5 sm:gap-5 lg:gap-[36px] font-medium'>
              <button
                disabled={timerOn}
                id={`break-decrement`}
                onClick={() => breakDecrement(-60)}
                className='bg-coffee rounded-md w-8 p-1 text-velvet '
              >
                <ArrowDown />
              </button>

              <span id={`break-length`} >{getTime(breakTime).mins}</span>

              <button
                disabled={timerOn}
                id={`break-increment`}
                onClick={() => breakIncrement(60)}
                className='bg-coffee rounded-md w-8 p-1 text-velvet'
              >
                <ArrowUp />
              </button>
            </div>
          </div>


          <div className="min-[400px]:text-lg sm:text-xl lg:text-[28px]">
            <h3 id={`session-label`} className='tracking-wide mb-2 lg:mb-4' >Session Length</h3 >
            <div className='flex justify-center items-center gap-2.5 sm:gap-5 lg:gap-[36px] font-medium'>
              <button
                disabled={timerOn}
                id={`session-decrement`}
                onClick={() => sessionDecrement(-60)}
                className='bg-coffee rounded-md w-8 p-1 text-velvet '
              >
                <ArrowDown />
              </button>

              <span id={`session-length`} >{getTime(sessionTime).mins}</span>

              <button
                disabled={timerOn}
                id={`session-increment`}
                onClick={() => sessionIncrement(60)}
                className='bg-coffee rounded-md w-8 p-1 text-velvet'
              >
                <ArrowUp />
              </button>
            </div>
          </div> 

        </div>
        <div className=" text-center border-4 border-coffee px-12 py-5 md:px-16 md:py-7 rounded-3xl">
          <h2 id="timer-label" className='text-center text-xl sm:text-2xl
           md:text-3xl mb-4'>{onBreak ? 'Break' : 'Session'}</h2>
          <div id="time-left" className='text-5xl md:text-6xl'>{getTime(displayTime).duration}</div>
        </div>
        <div className=" flex gap-x-5">
          <button className='bg-coffee rounded-md  p-2 text-velvet'  id='start_stop'
            onClick={startStopTimer} >
            {timerOn ?  <Pause/> : <Play/>}
          </button>
          <button className='bg-coffee rounded-md  p-2 text-velvet outline-none' id='reset'
            onClick={resetTime}>
            <RefreshCw/>
          </button>
          
          <audio
            id='beep'
            ref={audioRef}
            preload="auto"
            src={beep}
          ></audio>

        </div>
        <div className="text-center absolute bottom-0 py-4 text-[16px] ">Made with  <Heart className='inline-block animate-bounce delay-700' width={16}/> by <span className='text-lg font-semibold'>Dhruv Verma</span></div>
      </div>

    </div>
  )
}



export default App
