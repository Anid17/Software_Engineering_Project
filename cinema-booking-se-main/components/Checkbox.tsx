import React from 'react'

interface InputProps {
    option: string,
    functionHandle?: any,
    selectedCheckboxes?: any,
}

const Checkbox: React.FC<InputProps> = ({option,functionHandle,selectedCheckboxes}) => {
  return (
    <label key={option}>
        <input
        type="checkbox"
        value={option}
        checked={selectedCheckboxes.includes(option)}
        onChange={(e) => selectedCheckboxes(e.target.value)}
        />
        {option}
    </label>
  )
}

export default Checkbox