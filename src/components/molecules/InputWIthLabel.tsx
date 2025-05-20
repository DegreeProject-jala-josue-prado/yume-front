import React, { ChangeEvent } from 'react';
import Input from '../atoms/Input';

interface InputWithLabelProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <div className={`input-group ${className}`}>
      <label className="input-label">{label}</label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

export default InputWithLabel;
