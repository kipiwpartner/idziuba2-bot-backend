const express = require('express');
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();

const dotenv = require('dotenv');
dotenv.config({path : './config.env'});

const init = require('./services/init.js')

app.use(express.urlencoded({extended:true}));
app.use(express.json())
const store = new MongoDBStore({
    uri: process.env.DATABASE_URI,
    collection: 'sessions'
})
app.use(session({
    secret: 'ivan session secret',
    resave: false,
    saveUninitialized: false,
    store
  }))

app.use('/auth', require('./routes/auth.route'))
app.use('/user', require('./routes/user.route'))
app.use('/role', require('./routes/role.route'))
app.use('/blacklisttoken', require('./routes/blacklisttoken.route'))

app.get('*', (req, res) => {
    res.status(404)
    res.send(`404 Error...`)
})

async function start(app) {
    try {
        await init.startApp(app)
    } catch(e){
        console.log('Error starting app...', e.message)
        process.exit(1)
    }
}

start(app)