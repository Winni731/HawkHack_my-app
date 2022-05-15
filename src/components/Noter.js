import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Tasks from './Tasks'
import ReactDOM from 'react-dom'
import MicRecorder from 'mic-recorder-to-mp3'
// import Titles from './Titles'

const Noter = ({onAdd, showAdd}) => {
  const onClick = () => {
    console.log('click confirmed!')
  }

  
  return (
    <div className='NoteBook'>
        <Button color={showAdd ? 'grey' : 'pink'}
         text={showAdd ? 'Leave NoteBook' : 'Start Story'} onClick=
        {onAdd}></Button>
    </div>
  )
}

export default Noter