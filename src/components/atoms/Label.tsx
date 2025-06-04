const Label = ({ children, htmlFor }: { children: React.ReactNode, htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="block text-gray-700 text-sm font-bold mb-2">
    {children}
  </label>
);

export default Label;