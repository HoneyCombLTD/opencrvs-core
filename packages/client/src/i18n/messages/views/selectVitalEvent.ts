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
import { defineMessages, MessageDescriptor } from 'react-intl'

interface ISelectPrimaryInformantMessages
  extends Record<string | number | symbol, MessageDescriptor> {
  registerNewEventTitle: MessageDescriptor
  registerNewEventHeading: MessageDescriptor
  errorMessage: MessageDescriptor
}

const messagesToDefine: ISelectPrimaryInformantMessages = {
  registerNewEventTitle: {
    id: 'register.selectVitalEvent.registerNewEventTitle',
    defaultMessage: 'New declaration',
    description: 'The title that appears on the select vital event page'
  },
  registerNewEventHeading: {
    id: 'register.selectVitalEvent.registerNewEventHeading',
    defaultMessage: 'What type of event do you want to declare?',
    description: 'The section heading on the page'
  },
  errorMessage: {
    id: 'register.selectVitalEvent.errorMessage',
    defaultMessage: 'Please select the type of event',
    description: 'Error Message to show when no event is being selected'
  }
}

export const messages: ISelectPrimaryInformantMessages =
  defineMessages(messagesToDefine)
