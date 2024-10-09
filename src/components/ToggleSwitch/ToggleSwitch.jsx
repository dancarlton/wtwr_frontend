import { useState } from 'react'
import './ToggleSwitch.css'

function ToggleSwitch() {
  const [currentTempUnit, setCurrentTempUnit] = useState('C')

  const handleChange = () => {
    if (currentTempUnit === 'C') setCurrentTempUnit('F')
    if (currentTempUnit === 'F') setCurrentTempUnit('C')
  }

  console.log(currentTempUnit)

  return (
    <label className='switch'>
      <input type='checkbox' className='switch-box' onChange={handleChange} />
      <span
        className={
          currentTempUnit === 'F'
            ? 'switch__slider switch__slider-F'
            : 'switch__slider switch__slider-C'
        }
      ></span>
      <p className={`switch__temp-F ${currentTempUnit === 'F' && 'switch__active'}`}>F</p>
      <p className={`switch__temp-C ${currentTempUnit === 'C' && 'switch__active'}`}>C</p>
    </label>
  )
}

export default ToggleSwitch
