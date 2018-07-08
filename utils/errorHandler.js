module.exports = (res, error) => {
  res.status(500).json({
    successs: false,
    message: error.message ? error.message : error
  })
}