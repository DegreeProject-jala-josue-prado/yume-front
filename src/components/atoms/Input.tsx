const Input = ({ id, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input id={id} {...props} />
);

export default Input;
