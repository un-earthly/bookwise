import React, { ChangeEvent } from 'react';

interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, type, placeholder, value, onChange }) => (
    <div className="form-control">
        <label className="label">
            <span className="label-text">{label}</span>
        </label>
        <input
            type={type}
            placeholder={placeholder}
            className="input input-bordered"
            value={value}
            onChange={onChange}
        />
    </div>
);

export default Input;
