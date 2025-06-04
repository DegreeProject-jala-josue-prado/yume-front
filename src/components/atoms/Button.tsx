import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;