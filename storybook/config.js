import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import GlobalStyles from '../src/styles/global'

addDecorator(
  withInfo({
    inline: true
  })
)

addDecorator(s => <div><GlobalStyles />{s()}</div>)
configure(require.context('../src', true, /\.stories\.js$/), module)
