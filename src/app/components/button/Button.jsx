function Button({ children, classes, testId, onButtonClick = () => {} }) {
  const handleClick = () => {
    onButtonClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center border border-transparent font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 ${classes}`}
      data-testid={testId}
    >
      {children}
    </button>
  );
}

export default Button;
