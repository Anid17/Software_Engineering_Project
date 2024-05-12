import React from "react";

interface InputProps {
    id? : string;
    onChange? : any;
    value?: string;
    type?: string;
    placeholder: string;
    className?: string;
}

const Search: React.FC<InputProps> = ({
    id,
    onChange,
    value,
    type,
    placeholder,
    className
}) => {
    return (
        <div className={`${className} inputwcontrol flex bg-primaryvariant1 rounded-[10px] items-center pl-[16px] focus:outline-[1px] focus:outline-white focus:shadow-[0_0_15px_rgba(255,255,255,0.2)]`}>
            <span>
                <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16.002" height="16" viewBox="0 0 16.002 16">
                    <path id="interface-search_1_" data-name="interface-search (1)" d="M6.341.151a6.74,6.74,0,0,0-3.15.952,7.023,7.023,0,0,0-.883.631,7.783,7.783,0,0,0-.817.817,6.768,6.768,0,0,0,1.2,9.84,7.6,7.6,0,0,0,.733.464c.123.067.374.191.509.25a6.708,6.708,0,0,0,2.383.566c.159.008.541.008.7,0a6.754,6.754,0,0,0,3.911-1.5l.1-.079c.007,0,.457.441,1.982,1.966,1.276,1.275,1.986,1.98,2.009,1.995a.578.578,0,0,0,.158.073.42.42,0,0,0,.159.017.456.456,0,0,0,.152-.014.579.579,0,0,0,.261-.159.565.565,0,0,0,.142-.244.456.456,0,0,0,.014-.152.42.42,0,0,0-.017-.159.578.578,0,0,0-.073-.158c-.015-.023-.72-.733-1.995-2.009-1.525-1.526-1.971-1.975-1.966-1.982l.079-.1a6.754,6.754,0,0,0,1.5-3.911c.008-.159.008-.541,0-.7a6.694,6.694,0,0,0-.479-2.174A6.79,6.79,0,0,0,9.595.807,6.668,6.668,0,0,0,6.642.145c-.107,0-.243,0-.3.006M6.4,1.294,6.268,1.3a5.6,5.6,0,0,0-3.1,1.206,5.026,5.026,0,0,0-.475.43,5.026,5.026,0,0,0-.43.475,5.608,5.608,0,0,0-1.16,2.675,4.738,4.738,0,0,0-.055.819,4.751,4.751,0,0,0,.051.806,5.627,5.627,0,0,0,3.319,4.354A5.648,5.648,0,0,0,9.2,11.937a5.653,5.653,0,0,0,2.5-2.5,5.644,5.644,0,0,0-.2-5.415A5.759,5.759,0,0,0,9.981,2.366,5.619,5.619,0,0,0,7.084,1.3C7,1.3,6.469,1.289,6.4,1.294" transform="translate(0.1 -0.145)" fill="#a79dae" fill-rule="evenodd"/>
                </svg>
            </span>
            <input 
                id={id}
                value={value}
                type={type}
                onChange={onChange}
                placeholder={placeholder}
                className="rounded-[10px] font-opensans text-[16px] p-[16px] bg-none bg-primaryvariant1 text-white placeholder:text-placeholder focus:outline-[1px] focus:outline-none flex-1"
            />
        </div>
    )
}

export default Search;