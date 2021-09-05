const app = require('./server')
const PORT = process.env.PORT || 3000

const initializeApp = async () => {
  try {
    app.listen(PORT, () => console.log(`app is listening on ${PORT}`))
  }
  catch (error) {
    console.log(error)
  }
}

initializeApp()