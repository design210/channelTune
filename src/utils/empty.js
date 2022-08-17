function isEmpty(value) {
  if (value === "null") {
    return "";
  }
  return value ?? "";
}

export default isEmpty;
