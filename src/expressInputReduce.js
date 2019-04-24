

module.exports = (schema) => {
  return (req, res, next) => {
    for (let skey in schema) {
      req[skey] = reducer(req[skey], schema[skey])
    }
    return next()
  }
}
