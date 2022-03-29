import * as Sentry from 'sentry-expo'

function init() {
  Sentry &&
    Sentry.init({
      dsn: 'https://bb9e66829ba74f259e8b5da0139a2c8f@o385086.ingest.sentry.io/6193707',
      debug: true,
      enableInExpoDevelopment: true,
    })
}

export function log(error) {
  Sentry.Native.captureException(error)
}

const logger = {
  init,
  log,
}

export default logger
