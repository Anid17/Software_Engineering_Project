import React from 'react'

interface Props {
    id : string;
    onChange : any;
    value: string;
    label?: string;
    placeholder: string;
}

const Textarea: React.FC<Props> = ({id,
    onChange,
    value,
    label,
    placeholder,}) => {
  return (
    <div className="flex flex-col mb-[16px] w-full">
        <label className="text-[14px] text-white font-opensans mb-[8px]" htmlFor={id}>
            {label}
        </label>
        
        <textarea 
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className="rounded-[10px] font-opensans text-[16px] bg-primaryvariant1 p-[16px] text-white placeholder:text-placeholder customInput"
        />
    </div>
  )
}

export default Textarea