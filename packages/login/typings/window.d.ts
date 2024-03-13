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
interface Window {
  config: {
    AUTH_API_URL: 'http://192.168.0.50:4040'
    CONFIG_API_URL: 'http://config:2021'
    COUNTRY_CONFIG_URL: 'http://192.168.0.50:3040'
    COUNTRY: 'FAR'
    LANGUAGES: 'en,fr'
    AVAILABLE_LANGUAGES_SELECT: 'en:English,fr:Français,bn:বাংলা'
    USER_NOTIFICATION_DELIVERY_METHOD: 'sms' | 'email'
    INFORMANT_NOTIFICATION_DELIVERY_METHOD: 'sms' | 'email'
    CLIENT_APP_URL: string
    PHONE_NUMBER_PATTERN: RegExp
    LOGROCKET: ''
    SENTRY: ''
  }
}
