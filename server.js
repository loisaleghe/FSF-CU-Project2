// ****************************************************************************
// Server.js
// This file is the initial starting point for the Node/Express server.
// ****************************************************************************

// Dependencies
// =============================================================
const path = require('path')
const fileUpload = require('express-fileupload')
const express = require('express')
const exphbs = require('express-handlebars')

// Requiring our models for syncing to the MySQL database
// Remember: This syntax imports the `db` object exported from the
// `./models/index.js` module.
const db = require('./models')

// Sets up the Express App
// =============================================================
const app = express()

// Set up the Express app to use the Handlebars template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp')
  })
)

// Allow Express to automatically serve static resource like the
// HTML, CSS and JavaScript for the frontend client application.
app.use(express.static('./public'))

// Routes
// =============================================================
app.use('/users', require('./routes/users'))
app.get('/', (req, res) => res.render('index', { appName: 'Project 2 - Demo' }))

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`))
})
