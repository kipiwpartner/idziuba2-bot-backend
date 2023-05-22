import express from "express";
import session from "express-session"
import cors from 'cors'
import { createHandler } from 'graphql-http/lib/use/express';
import { adminSchema } from './graphql/shema.js';
//ENV
import dotenv from "dotenv";
dotenv.config({path : './config.env'});

const app = express();
/* TODO CORS for all now */
app.use(cors())

/* Auth check */
import auth from "./middleware/auth.js";

/* Set session to mongodb */
import { default as connectMongoDBSession} from 'connect-mongodb-session';
const MongoDBStore = connectMongoDBSession(session);

app.use(express.urlencoded({extended:true}));
app.use(express.json())

const store = new MongoDBStore({
    uri: process.env.DATABASE_URI,
    collection: 'sessions'
})
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}))

//Routes
import auth_route from "./routes/api/v1/auth.route.js";
app.use(process.env.API_VERSION, auth_route)
/* 404 */
app.get('*', (req, res) => {
    res.status(404)
    res.send(`404 Error...`)
})

/* GrapphQL Schemas */
app.use('/test', auth('manager'), createHandler({ schema: adminSchema }));
app.use('/admin', auth('admin'), createHandler({ schema: adminSchema }));

import init from "./services/init.js"
async function start(app) {
    try {
        await init.startApp(app)
    } catch(e){
        console.log('Error starting app...', e.message)
        process.exit(1)
    }
}

start(app)