export const filter = (object, predicate) => {
  return Object.keys(object)
    .filter(key => predicate(object[key]))
    .reduce((res, key) => Object.assign(res, { [key]: object[key] }), {});
};
