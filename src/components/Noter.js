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

//   const myStyle = {
//     fontSize: 50,
//     color: "#f57c00",
//   //  backgroundColor: "DodgerBlue",
//     padding: "80px",
//     text: {
//       textShadowColor: 'black', 
//       textShadowOffset: { width: -10, height: 0 },
//       textShadowRadius: 10
//     },
//     // textShadowColor: 'black', 
//     // textShadowOffset: { width: -10, height: 0 },
//     // textShadowRadius: 10, 
//     fontFamily: "Dancing Script",
//     fontStyle: 'italic'
//   }
  
  return (
    <div className='NoteBook'>
        {/* <h1 style={myStyle}>{title}</h1> */}
        <Button color={showAdd ? 'grey' : 'pink'}
         text={showAdd ? '离开添加' : '添加新任务'} onClick=
        {onAdd}></Button>
    </div>
  )
}

export default Noter