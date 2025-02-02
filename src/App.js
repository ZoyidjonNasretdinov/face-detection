import {useRef, useEffect} from 'react'
import './App.css'
import * as facemash from '@tensorflow-models/face-landmarks-detection'
import Webcam from 'react-webcam'


const App = () => {
  const webcamRef = useRef(null)



  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} className='webcam'/>
      </header>
    </div>
  )
}

export default App