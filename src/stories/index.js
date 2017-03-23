import React from 'react'
import { storiesOf } from '@kadira/storybook'
import CalendarInput from '../CalendarInput'
//import Calendar from '../index'
import '../../style/index.css'

storiesOf('Calendar', module)
  .add('default view', () => {
    return (
      <CalendarInput />
    )
  })
