export const Label = ({
  children,
  htmlFor,
}: {
  children: React.ReactNode;
  htmlFor?: string;
}) => {
  return (
    <label className="text-sm text-gray-900 font-semibold" htmlFor={htmlFor}>
      {children}
    </label>
  );
};
