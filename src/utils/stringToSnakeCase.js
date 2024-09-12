const stringToSnakeCase = (s) => {
  return s.trim().split(' ').join('_');
}

export default stringToSnakeCase