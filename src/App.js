// import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect, useRef } from 'react'
import cool from './cool.jpg'
import AddTask from './components/AddTask'
// import AudioPlayer from "./components/AudioPlayer"
import { icons } from 'react-icons';
import MicRecorder from 'mic-recorder-to-mp3'
import { FaMicrophone } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'
import { FaFileCsv } from 'react-icons/fa'
//import ReactShadowRoot from 'react-shadow-root'
// import cat from './cat.jpg'
// import TextInput from './components/TextInput';
// import Noter from './components/Noter'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Food Shopping',
        day: 'Feb 5th at 2:30 pm',
        reminder: false
    },
    {
        id: 2,
        text: 'Food Eating',
        day: 'Feb 6th at 2:30 pm',
        reminder: false
    }
])


  const addTask = (task) => {
    const id = Math.floor(Math.random()*10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    console.log('delete', id)
    setTasks(tasks.filter((task) => task.id != id))
  }

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {
      ...task, reminder: !task.reminder
    } : task))
  }

  const divStyle = {
    width: '100%',
    height: '900px',
    backgroundImage: `url(${cool})`,
    backgroundSize: 'cover'  
  }

  const formStyle = {
    fontSize: 30,
    color: "black",
  //  backgroundColor: "DodgerBlue",
    fontFamily: "'Trebuchet MS', sans-serif",
    padding: "80px",
    fontWeight: 'bold',
    textAlign: 'left'
  }

  //textInput style
  const noteStyle = {
    container: {
      flex: 1,
      alignItems: 'stretch',
    }
  }

  const TextField= () => {
    return <input />
  }

  const recorder= useRef(null)
  const audioPlayer = useRef(null)
  const timer = useRef(null)
  const time = useRef(0)
  const displayTime = useRef(null)

  const [blobURL, setBlobUrl] = useState(null)
  const [isRecording, setIsRecording] = useState(null)
  const [play, setPlay] = useState(false)

  useEffect ( () => {
    recorder.current = new MicRecorder({ bitRate: 128 })
  }, [])

  const startRecording = () => {
    recorder.current.start().then( () => {
      setIsRecording(true)
    })
  }

  const stopRecording = () => {
    recorder.current.stop().getMp3().then(([buffer, blob]) => {
      const newBlobUrl = URL.createObjectURL(blob)
      console.log(blob)
      setBlobUrl(newBlobUrl)
      setIsRecording(false)
    }).catch((e) => console.log(e))
  }

  useEffect( () => {
    if (isRecording) {
      startTimer()
    }
    else {
      stopTimer()
    }
  }, [isRecording])

  const playPause = () => {
    const player = audioPlayer.current

    if (player.paused) {
      player.play()
    }
    else {
      player.pause()
    }
    setPlay(!play)
  }

  const handlePrev = () => {
    audioPlayer.current.currentTime = 0
  }

  const startTimer = () => {
    time.current = 0
    timer.current = setInterval( () => {
      time.current++
      displayTime.current.innerText = time.current
    }, 1000)
  }

  const stopTimer = () => {
    clearInterval(timer.current)
  }

  const setTime = () => {
    if (audioPlayer.current) {
      displayTime.current.innerText = Math.floor(audioPlayer.current.duration)
    }
  }

  return (
    <div className="App" style={divStyle}>
      {/* <ReactShadowRoot> This is a shadow Text !!!</ReactShadowRoot> */}
      <Header onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}/>
      <Tasks tasks={tasks} onDelete={deleteTask} />
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : ''} 
      <p>
        
      </p>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <AudioPlayer onPlay= {() => set}/> */}
      {/* <TextFild value={write} 
      label="write your sharing"
      onChange={ (e) => {
        setName(e.target.value);
      }} />
      <h3>Your Enter Value is: {write}</h3> */}
      <FaMicrophone style={{color: 'black', cursor: 'pointer'}} onClick={startRecording} disabled={isRecording} />
      <FaSquare style={{color: 'red', cursor: 'pointer'}} onClick={stopRecording} disabled={!isRecording} />
      <audio
        ref={audioPlayer}
        src={blobURL}
        controls="controls"
        onLoadedMetadata={setTime} //fethches metadata info like duration
        onTimeUpdate={setTime} //event handler whenever time progresses on player
        onEnded={() => setPlay(false)} //event handler when audio has stopped playing
      />
      <button onClick={playPause} disabled={!blobURL}>
        {play ? "Pause" : "Play"}
      </button>{" "}
      {/*handle play/pause*/}
      <button onClick={handlePrev} disabled={!blobURL}>
        Previous
      </button>{" "}
      {/*handle previous*/}
      <p ref={displayTime}>Time {timer.current}</p> {/*Displays time*/}

      {/* <form>
      <fieldset>
         <label>
           <p><b>what's do you want to share today ?</b></p>
           <input name="name" />
         </label>
       </fieldset>
       <button type="submit" >Submit</button>
      </form> */}
      {/* <Noter onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}/> */}
      {/* <TextInput style={noteStyle} onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}/> */}
      {/* {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : ''} */}
    </div>
  )
}

export default App

