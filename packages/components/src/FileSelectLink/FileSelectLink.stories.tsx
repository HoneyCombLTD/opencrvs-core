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
import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { FileSelectLink } from './FileSelectLink'

export default {
  title: 'Input/File Select Link',
  component: FileSelectLink
} as ComponentMeta<typeof FileSelectLink>

const Template: ComponentStory<typeof FileSelectLink> = (args) => (
  <FileSelectLink {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Upload',
  handleFileChange: () => {
    alert('Uploaded!')
  }
}
