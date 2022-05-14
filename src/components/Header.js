import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Tasks from './Tasks'
import ReactDOM from 'react-dom'
import MicRecorder from 'mic-recorder-to-mp3'
// import Titles from './Titles'

const Header = ({title}) => {
  const onClick = () => {
    console.log('click confirmed!')
  }

  const myStyle = {
    fontSize: 50,
    color: "#f57c00",
  //  backgroundColor: "DodgerBlue",
    padding: "80px",
    text: {
      textShadowColor: 'black', 
      textShadowOffset: { width: -10, height: 0 },
      textShadowRadius: 10
    },
    // textShadowColor: 'black', 
    // textShadowOffset: { width: -10, height: 0 },
    // textShadowRadius: 10, 
    fontFamily: "Dancing Script",
    fontStyle: 'italic'
  }
  
  return (
    <header className='header'>
        <h1 style={myStyle}>{title}</h1>
        {/* <Button color={showAdd ? 'grey' : 'pink'}
         text={showAdd ? '离开添加' : '添加新任务'} onClick=
        {onAdd}></Button> */}
    </header>
  )
}

var Titles =[ 
  'It is always morning somewhere in the world',
  'A friend in need is a friend indeed',
  'single spark can start a prairie fire',
  'Speech is the image of actions',
  'Each man is the architect of his own fate',
  'This is courage in a man: to bear unflinchingly what heaven sends',
  'Life is a pure flame, and we live by an invisible sun within us',
  'Every man is the architect of his own fortune',
  'Patience and application will carry us through',
  'Life is fine and enjoyable, yet you must learn to enjoy your fine life',
  'Courage is the ladder on which all the other virtues mount',
  'I am not afraid of tomorrow for I have seen yesterday and love today',
  'No matter how long the rain lasts, there will be a rainbow in the end. No matter how sad you may be, believe, that happiness is waiting',
  'No man or woman is worth your tears, and the one who is, wonnot make you cry',
  'To the world you may be one person, but to one person you may be the  world',
  'Time would heal almost all wounds. If your wounds have not been healed up, please wait for a short while',
  'Life is sad at times, but it is up to you to make your own life happy',
  'Use your smile to change the world. Donnot let the world change your smile',
  'Never forget the power of your words! Use your words to direct your life…tell yourself where you are going!',
  'Never frown, even when you are sad, because you never know who is falling in love with your smile',
  'Reflect on your present blessings, of which every man many ,not on you past misfortunes, of which all men have some'
]

Header.defaultProps = {
  title: Titles[Math.floor(Math.random()*Titles.length)],
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header
