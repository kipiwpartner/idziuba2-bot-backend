import express from "express";
import session from "express-session"
import cors from 'cors'
import { createHandler } from 'graphql-http/lib/use/express';
import { adminSchema } from './graphql/shema.js';

const app = express();
app.use(cors())

import auth from "./middleware/auth.js";

import { default as connectMongoDBSession} from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);

//ENV
import dotenv from "dotenv";
dotenv.config({path : './config.env'});

//Routes
import init from "./services/init.js"
import auth_route from "./routes/auth.route.js";
// import user_route from "./routes/user.route.js";
// import role_route from "./routes/role.route.js";
// import blacklisttoken_route from "./routes/blacklisttoken.route.js";

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

app.use('/auth', auth_route)
// app.use('/user', user_route)
// app.use('/role', role_route)
// app.use('/blacklisttoken', blacklisttoken_route)

app.get('*', (req, res) => {
    res.status(404)
    res.send(`404 Error...`)
})

app.use('/test', auth('manager'), createHandler({ schema: adminSchema }));
app.use('/admin', auth('admin'), createHandler({ schema: adminSchema }));

async function start(app) {
    try {
        await init.startApp(app)
    } catch(e){
        console.log('Error starting app...', e.message)
        process.exit(1)
    }
}

start(app)