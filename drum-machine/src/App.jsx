import { useState } from 'react'
import Drumpad from './components/Drumpad'
import {Heater1, Heater2, Heater3, Heater4, Clap, OpenHH, Kick_n_Hat, Kick, CloseHH } from './assets/Audio'

function App() {
  const [audioName, setAudioName] = useState('Heater-1')

  const handleClick = (e) => {
    const audioElement = e.target.children[0]
    const audioName = audioElement.attributes[2].nodeValue
    audioElement.play()
    setAudioName(audioName)
    console.log(audioName)
  }

  const handleKeyDown = (e) => {
    const audioElement = document.getElementById(e.key.toUpperCase())
    const audioName = audioElement?.attributes[2].nodeValue

    if (audioElement) {
      audioElement.play()
      setAudioName(audioName)
    }
    
  }

  
  window.addEventListener('keydown', handleKeyDown)

  return (
    <div id='drum-machine'>
      <h1  className='text-center text-5xl font-bold p-4 mb-16'>Drum Machine</h1>

      <div id='display' className=" grid grid-flow-col gap-5 place-content-center mb-10 text-3xl font-semibold text-[#42ce80]">
        {audioName}
      </div>
      
      <div  className='grid place-content-center' >
        <div  className='w-[240px] min-[360px]:w-[320px] min-[430px]:w-[380px]  sm:w-[450px] flex flex-col gap-y-3 aspect-square drop-shadow-custom'>
          
          <div className="row flex gap-x-3">
            <Drumpad keys='Q' audioName='Heater-1' audioSrc={Heater1} handleClick={handleClick} handleKeyDown={handleKeyDown} />
            <Drumpad keys='W' audioName='Heater-2' audioSrc={Heater2} handleClick={handleClick}  handleKeyDown={handleKeyDown}/>
            <Drumpad keys='E' audioName='Heater-3' audioSrc={Heater3} handleClick={handleClick} handleKeyDown={handleKeyDown} />
            
          </div>
          <div className="row flex gap-x-3">
            <Drumpad keys='A' audioName='Heater-4'  audioSrc={Heater4} handleClick={handleClick} handleKeyDown={handleKeyDown} />
            <Drumpad keys='S' audioName='Clap' audioSrc={Clap} handleClick={handleClick} handleKeyDown={handleKeyDown} />
            <Drumpad keys='D' audioName='Open-HH' audioSrc={OpenHH} handleClick={handleClick} handleKeyDown={handleKeyDown} />
          </div>
          <div className="row flex gap-x-3">
            <Drumpad keys='Z' audioName="Kick-n'-Hat" audioSrc={Kick_n_Hat} handleClick={handleClick} handleKeyDown={handleKeyDown} />
            <Drumpad keys='X' audioName='Kick' audioSrc={Kick} handleClick={handleClick} handleKeyDown={handleKeyDown} />
            <Drumpad keys='C' audioName='Closed-HH' audioSrc={CloseHH}  handleClick={handleClick} handleKeyDown={handleKeyDown} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default App



