export const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={`flex-1 py-2 px-4 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-transparent text-sm ${className}`}
    />
  );
};
