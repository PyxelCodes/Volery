import express, { Request, Response } from 'express';
import expressws from 'express-ws';
import cors from 'cors'
import mongoose from 'mongoose'
import ratelimit from 'express-rate-limit'
import config from './config'
import v1 from './routes/v1'
import * as Sentry from '@sentry/node'
import 'colors'

const app = express();
expressws(app);

app.use(express.json({ limit: '1mb' }));
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

app.use('/v1', v1);
app.use('*', (req: Request, res: Response) => {
    res.status(404).json({
        msg: '404 Not Found',
        code: 0,
        errno: 0
    })
})

app.listen(config.port).on('listening', () => console.log('Volery api online'))