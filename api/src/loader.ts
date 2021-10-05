
import rateLimit from 'express-rate-limit';
import walk from './utils/walk';

export let log = (...args: string[]) => {
    console.log(`[VoleryApi | RouteLoader]`.magenta, ...args)
}

export async function loader(app: any): Promise<any> {

    let dirname = __dirname.replace(/\\/g, '/') // windows

    let endpoints = await walk(__dirname + '/routes', 'file')

    for (let i in endpoints) {
        let filepath = endpoints[i].file.replace(/\\/g, '/')
        let path = filepath.replace(dirname + '/routes', '').replace('.ts', '').replace('/index', '')

        let endpoint = require(filepath).default;

        if (!endpoint.methods) continue;


        if (/\[(.*?)\]/.test(path)) {
            // dynamic route
            //    log('Loading Dynamic route', path)

            for (let x in endpoint.methods) {
                let method = endpoint.methods[x].toLowerCase();
                if (typeof app[method] == 'function') {
                    log(`Registered ${method.toUpperCase().red} ${path.replace(/\[(.*?)\]/g, ':$1').replace(/\//g, '/'.red)}`)
                    app
                        .route(path.replace(/\[(.*?)\]/g, ':$1'))
                    [method](endpoint[method])
                    if (endpoint.ratelimits?.[method]) {
                        app.use(path.replace(/\[(.*?)\]/g, ':$1'), rateLimit({ windowMs: 4 * 60 * 1000, max: endpoint.ratelimits[method] as number, message: '{"msg":"429 Too Many Requests","code":6}' }))
                        log('Ratelimit for', `${endpoint.ratelimits[method]}x`.blue, `every ${'4min'.blue} on ${method.toUpperCase().red} ${path.replace(/\[(.*?)\]/g, ':$1').replace(/\//g, '/'.red)}`)
                    }
                }
            }

        } else {
            //log('Loading standard route', path)
            for (let x in endpoint.methods) {
                let method = endpoint.methods[x].toLowerCase();
                if (typeof app[method] == 'function') {
                    log(`Registered ${method.toUpperCase().red} ${path.replace(/\[(.*?)\]/g, ':$1').replace(/\//g, '/'.red)}`)
                    app
                        .route(path)
                    [method](endpoint[method])
                    if (endpoint.ratelimits?.[method]) {
                        app.use(path, rateLimit({ windowMs: 4 * 60 * 1000, max: endpoint.ratelimits[method] as number, message: '{"msg":"429 Too Many Requests","code":6}' }))
                        log('Ratelimit for', `${endpoint.ratelimits[method]}x`.blue, `every ${'4min'.blue} on ${method.toUpperCase().red} ${path.replace(/\[(.*?)\]/g, ':$1').replace(/\//g, '/'.red)}`)
                    }
                }
            }

        }




    }


    return app;
}

