import csp from 'helmet-csp'
import express from 'express'
import expressStaticGzip from 'express-static-gzip'
import history from 'connect-history-api-fallback'
import isPortReachable from 'is-port-reachable'
import morgan from 'morgan'

const port = process.env.PORT_PUBLIC || 3000
const staticFileMiddleware = expressStaticGzip('build/dist')

const app = express()

// Log requests
app.use(morgan('method=:method url=:url status=:status duration=:response-time size=:res[content-length]', {
  skip(req) { return req.url === '/healthcheck' }
}))

// Configure default headers
app.disable('x-powered-by')
app.use((req, res, next) => {
  res.header('X-App-Name', process.env.PLATFORM_APPLICATION_NAME)
  res.header('X-App-Version', process.env.PLATFORM_ARTIFACT_VERSION)
  if (req.url.indexOf('/assets') === 0) {
    // All assets are hashed, we can safely cache them for a long time
    const cacheSeconds = 30 * 24 * 60 * 60
    res.setHeader('Cache-Control', 'public, max-age=' + cacheSeconds)
  }
  next()
})
app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", 'data:', 'blob:'],
    connectSrc: ["'self'", 'blob:', 'http://localhost:8080'],
    reportUri: '/api/v1/splunk',
    upgradeInsecureRequests: false
  }
}))

// Simple healthcheck on specific route so it can be filtered from request logs
app.get('/healthcheck', (req, res) => res.send('HAPPY'))

// to test ports
app.get('/port/:host/:port', (req, res) => {
  isPortReachable(req.params.port, { host: req.params.host }).then((reachable) => {
    res.send(reachable)
  })
})

app.get('/test-endpoint', (req, res) => res.send({ message: 'Successfully called API!' }))

// All of our files are static. Webpack takes care of pre-gziping them.
// This deals with serving them.
app.use(staticFileMiddleware)

// We are using a single page app with routing on the client. This rewrites
// all incoming requests (for things other than static files) to point
// at our entry point
app.use(history({ disableDotRule: true, verbose: true }))
// Included a second time so that /index.html can be served
app.use(staticFileMiddleware)

app.listen(port, () => console.log(`Startup port=${port}`)) // eslint-disable-line no-console
