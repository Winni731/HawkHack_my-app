import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import { useState, useEffect, useRef } from 'react'
import cool from './cool.jpg'
import AddTask from './components/AddTask'
import { icons } from 'react-icons';
import MicRecorder from 'mic-recorder-to-mp3'
import { FaMicrophone } from 'react-icons/fa'
import { FaSquare } from 'react-icons/fa'
import { FaFileCsv } from 'react-icons/fa'
//import ReactShadowRoot from 'react-shadow-root'
import Noter from './components/Noter'

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect( () => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8000/tasks')
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:8000/tasks/${id}`)
    const data = await res.json()

    return data
  }


  const addTask = async (task) => {
    const res = await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE'
    })
    console.log('delete', id)
    setTasks(tasks.filter((task) => task.id != id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder}
    const res = await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id === id ? {
      ...task, reminder: data.reminder
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
      <Header />
      <p>
        
      </p>
      <FaMicrophone style={{color: 'black', cursor: 'pointer'}} onClick={startRecording} disabled={isRecording} />
      <FaSquare style={{color: 'red', cursor: 'pointer'}} onClick={stopRecording} disabled={!isRecording} />
      <audio
        ref={audioPlayer}
        src={blobURL}
        controls="controls"
        onLoadedMetadata={setTime} 
        onTimeUpdate={setTime} 
        onEnded={() => setPlay(false)} //event handler when audio has stopped playing
      />
      <button onClick={playPause} disabled={!blobURL}>
        {play ? "Pause" : "Play"}
      </button>{" "}
      <button onClick={handlePrev} disabled={!blobURL}>
        Previous
      </button>{" "}
      <p ref={displayTime}>Time {timer.current}</p> 

      <Noter onAdd={() => setShowAddTask(!showAddTask)}
      showAdd={showAddTask}/> 
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : ''} 
    </div>
  )
}

export default App