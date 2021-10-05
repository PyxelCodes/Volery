import express, { Request, Response } from 'express';
import expressws from 'express-ws';
import cors from 'cors'
import mongoose from 'mongoose'
import ratelimit from 'express-rate-limit'
import config from './config'
import * as Sentry from '@sentry/node'
import 'colors'
import './auth/github'
import passport from 'passport';
import cm from 'connect-mongo'
import session from 'express-session'
import bodyParser from 'body-parser';
var app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
process.wsInstance = expressws(app);
import gateway from './gateway'



app.use(cors())

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())
app.use(Sentry.Handlers.errorHandler());
app.use('/', ratelimit({
    windowMs: 4 * 60 * 1000,
    max: 50,
    message: '{"msg":"429 Too Many Requests","code":6}'
}))

mongoose.connect(config.mongo.uri, {//@ts-ignore idk what mongo is doing here?
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const Store = cm(session);

app.use(session({
    secret: 'h',
    resave: false,
    saveUninitialized: false,
    store: new Store({ mongooseConnection: mongoose.connection })
}))

app.use(passport.initialize())
app.use(passport.session())


import { loader } from './loader'; // load endpoints

loader(app).then((editedApp: any) => {
    app = editedApp;
    //@ts-ignore
    app.use('/gateway', gateway)

    app.use('*', (req: Request, res: Response) => {
        res.status(404).json({
            message: '404 Not Found',
            code: 0,
            errno: 0
        })
    })

    app.listen(config.port).on('listening', () => console.log('Volery api online'))
});

