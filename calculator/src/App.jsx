import { useEffect, useState } from 'react'
import Button from './Button'

let calculation = ''

function App() {
  const [result, setResult] = useState('')

  const ifOperator = (value) => {
    if (value === '+' || value=== '-' || value === '*' || value === '/') return true
    else false
  }

  const ifNum = (val) => {
    const num = ['1','2','3','4','5','6','7','8','9','0']
    return num.map((el) => el === val ? true : false ).filter(el => el === true)[0]
  }

    
  const handleClick = (e) => {
    let updateValue = (e.target.textContent)

    if (typeof calculation !== 'string') calculation = String(calculation)
    let lastSign = calculation.length !== 0 ? calculation.charAt(calculation.length - 1) : ''
    let secondLastSign = calculation.length >=2 ? calculation.charAt(calculation.length - 2) : ''
    
    
    if (calculation[0] === '0' && calculation[1] !== '.') calculation = ''

    if (updateValue === '=') {
      calculation = eval(calculation)
      if ((calculation % 1) && (typeof calculation === 'number')) calculation = calculation.length > 4 ? calculation.toFixed(4) : calculation
    }

    else if (updateValue === '.') {
      if (calculation.includes('.')) {
        if (lastSign === '.' && updateValue === '.') calculation = calculation.slice(0, -1)
        else if (secondLastSign === '.' && ifNum(lastSign) && updateValue === '.') return
      }

      calculation += updateValue
    }
    
    else if (updateValue === 'AC') calculation = '0'
    else if (updateValue === 'DE') calculation = calculation.length > 1 ? calculation.slice(0, - 1) : '0'
    else {
   
      if (ifOperator(lastSign) && ifOperator(updateValue) && (updateValue !== '-')) {
        calculation = calculation.slice(0, -1)
      }

      if (ifOperator(secondLastSign) && ifOperator(lastSign) && ifOperator(updateValue)) {
        calculation = calculation.slice(0, -1)
      }
      

      calculation += updateValue

    }
    
    setResult(calculation)
  }

 



  return (
    <>
      <div className=' text-[#5abca6] '>
        <h1 className=' text-3xl min-[400px]:text-4xl sm:text-5xl font-bold text-center m-4 mb-20'>Calculator</h1>

        <div className="calculator grid place-content-center w-full">
          <div className="flex flex-col w-fit bg-[#110904] gap-4 shadow-custom p-5 rounded-2xl ">
            <p id="display" className={`w-[260px] h-[80px] text-right text-[42px]  p-1.5 border-2 border-[#5abca6] mb-3`}>{result}</ p>
            <div className="flex justify-center w-fit gap-x-3 ">
              <Button el='1' id='one' handleClick={handleClick} />
              <Button el='2' id='two' handleClick={handleClick} />
              <Button el='3' id='three' handleClick={handleClick} />
              <Button el='+' id='add' handleClick={handleClick} />
            </div>
            <div className="flex justify-center w-fit gap-x-3">
              <Button el='4' id='four' handleClick={handleClick} />
              <Button el='5' id='five' handleClick={handleClick} />
              <Button el='6' id='six' handleClick={handleClick} />
              <Button el='-' id='subtract' handleClick={handleClick} />
            </div>
            <div className="flex justify-center w-fit gap-x-3">
              <Button el='7' id='seven' handleClick={handleClick} />
              <Button el='8' id='eight' handleClick={handleClick} />
              <Button el='9' id='nine' handleClick={handleClick} />
              <Button el='*' id='multiply' handleClick={handleClick} />
            </div>
            <div className="flex justify-center w-fit gap-x-3">
              <Button el='0' id='zero' handleClick={handleClick} />
              <Button el='.' id='decimal' handleClick={handleClick} />
              <Button el='=' id='equals' handleClick={handleClick} />
              <Button el='/' id='divide' handleClick={handleClick} />
            </div>
            
            <div className="flex justify-center w-fit gap-x-3">
              <Button el='AC' id='clear' handleClick={handleClick} />
              <Button el='DE' id='delete' handleClick={handleClick} />
             
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
