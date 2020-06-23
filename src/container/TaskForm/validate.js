const validate = (values) => {
  const error = {};
  const { tittle, description} = values;
  if (!tittle) {
    error.tittle = "You don't leave a bank";
  } else if (tittle.trim().length < 5) {
    error.tittle = "Must be 5 characters or over";
  }

  if (!description) {
    error.description = "You don't leave a bank"
  } else if (description.length < 5) {
    error.description = "Must be 5 characters or over"
  }



  return error;
};

export default validate;
