function SearchField({ handleChange, value, placeholder, classes }) {
  const onInputChange = (e) => {
    return handleChange(e);
  };

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onInputChange}
      data-testid="input-field"
      className={`border rounded p-2 outline-none ${classes}`}
    />
  );
}

export default SearchField;
