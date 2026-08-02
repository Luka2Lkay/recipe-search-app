function Button({ children, classes, testId, onButtonClick = () => {}, disabled = false }) {
  const handleClick = () => {
    if (disabled) return;
    onButtonClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`inline-flex items-center border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${classes}`}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

export default Button;
