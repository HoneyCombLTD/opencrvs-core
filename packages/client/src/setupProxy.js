/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors located at https://github.com/opencrvs/opencrvs-core/blob/master/AUTHORS.
 */
const proxy = require('http-proxy-middleware')
module.exports = function (app) {
  app.use(
    '/gateway',
    proxy({
      target: 'http://192.168.0.50:7070',
      changeOrigin: true,
      pathRewrite: {
        '^/gateway': '/'
      }
    })
  )
  app.use(
    '/countryconfig',
    proxy({
      target: 'http://192.168.0.50:3040/bgd',
      changeOrigin: true,
      pathRewrite: {
        '^/countryconfig': '/'
      }
    })
  )
}
