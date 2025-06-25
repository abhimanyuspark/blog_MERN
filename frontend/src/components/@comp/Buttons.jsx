export const Button = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
  loading,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} btn ${disabled && "btn-disabled"}`}
      disabled={disabled}
    >
      {loading && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};
