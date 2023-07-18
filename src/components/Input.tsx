import React, { ChangeEvent } from 'react';

interface InputProps {
    type: any;
    placeholder: string;
    value: any;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    min?: any,
    max?: any;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, min, max }) => (
    <div className="form-control">
        <label className="label">
            <span className="label-text">{placeholder}</span>
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered"
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            required={true}
        />
    </div>
);

export default Input;
