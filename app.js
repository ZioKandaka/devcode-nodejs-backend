require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3030
const host = process.env.HOST || 'localhost'

app.use(express.urlencoded({extended: false}))
app.use(express.json())
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const ControllerActivity = require('./controllers/Controller-activity')
const ControllerTodo = require('./controllers/Controller-todo')
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// activity
app.get("/activity-groups", ControllerActivity.getAll)
app.get("/activity-groups/:id", ControllerActivity.getOne)
app.post("/activity-groups", ControllerActivity.post)
app.patch("/activity-groups/:id", ControllerActivity.patch)
app.delete("/activity-groups/:id", ControllerActivity.destroy)

//  todo
app.get("/todo-items", ControllerTodo.getAll)
app.get("/todo-items/:id", ControllerTodo.getOne)


app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app hosted on ${host} and port ${port}`)
})