const { app, PORT } = require("./app")

app.listen(PORT, function () {
  console.log(`Server starting on port ${PORT}.`)
})