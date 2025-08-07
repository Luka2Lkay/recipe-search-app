const handleValidation = (dispatchError, dispatchValue) => {
  const validateInput = (value, type) => {
    if (/\d/.test(value)) {
      dispatchError(`${type} cannot be a number`);
      return false;
    }

    if (/[^a-zA-Z\s-]/.test(value)) {
      dispatchError(`${type} can only contain letters, spaces, and hyphens`);
      return false;
    }

    dispatchError("");
    return true;
  };

  const validateButton = (value, type) => {
    if (value.trim() === "") {
      dispatchError(`${type} cannot be empty`);
      return false;
    }

    if (/^-|-$/.test(value)) {
      dispatchError(`${type} cannot start or end with a hyphen`);
      return false;
    }

    if (/--/.test(value)) {
      dispatchError(`${type} cannot contain consecutive hyphens`);
      return false;
    }

    dispatchError("");
    return true;
  };

  const handleChange = (value, type) => {
    const isValid = validateInput(value, type);

    if (isValid) {
      dispatchValue(value);
    }
  };

  const handleButtonClick = (value, type) => {
    const isValid = validateButton(value, type);

    if (isValid) {
      dispatchValue(value);
      return true;
    }
    return false;
  };

  return { handleChange, handleButtonClick };
};

export default handleValidation;