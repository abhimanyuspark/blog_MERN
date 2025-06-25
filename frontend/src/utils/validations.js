export function validateForm(values) {
  const errors = {};

  if ("fullName" in values) {
    if (!values.fullName || values.fullName.trim() === "") {
      errors.fullName = "Name is required";
    }
  }

  if ("email" in values) {
    if (!values.email || values.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
      errors.email = "Email is invalid";
    }
  }

  if ("password" in values) {
    if (!values.password || values.password.trim() === "") {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
  }

  if ("title" in values) {
    if (!values.title || values.title.trim() === "") {
      errors.title = "Title is required";
    }
  }

  return errors;
}
