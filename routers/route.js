const authRouter = require('./authrouter')
const taskRouter = require('./taskrouter')

function route (app) {
    app.use('/', authRouter)
    app.use('/tasks', taskRouter)
}

module.exports = route;