import React from "react";

interface InputProps {
    id : string;
    onChange? : any;
    value: string;
    label?: string;
    type?: string;
    placeholder?: string;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    onChange,
    value,
    label,
    type,
    placeholder,
    className
}) => {
    return (
        <div className="flex flex-col mb-[16px] w-full">
            <label className={`text-[14px] text-white font-opensans ${label? 'mb-[8px]' : 'mb-0'}`} htmlFor={id}>
                {label}
            </label>
            
            <input 
                id={id}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className={`${className} customInput rounded-[10px] font-opensans text-[16px] bg-primaryvariant1 p-[16px] text-white placeholder:text-placeholder`}
            />
        </div>
    )
}

export default Input;