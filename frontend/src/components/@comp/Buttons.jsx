export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button type={type} onClick={onClick} className={`${className} btn w-full`}>
      {children}
    </button>
  );
};
