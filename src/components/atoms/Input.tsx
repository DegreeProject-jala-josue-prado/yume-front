import React from 'react';

// Extiende las props de un input HTML estándar
type InputProps = React.ComponentPropsWithoutRef<'input'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`
      block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
      placeholder-gray-400 focus:outline-none focus:ring-indigo-500 
      focus:border-indigo-500 sm:text-sm
      ${className}
    `}
    {...props}
  />
));

Input.displayName = 'Input';

export default Input;