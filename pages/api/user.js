export default (req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ temp:Math.round((Math.random() *10 + Number.EPSILON) * 100) / 100}))
  }