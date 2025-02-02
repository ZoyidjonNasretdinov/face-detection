import {useRef, useEffect} from 'react'
import './App.css'
import * as facemash from '@tensorflow-models/face-landmarks-detection'
import Webcam from 'react-webcam'


const App = () => {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  const runFacemesh = async() => {
    const net = await facemash.load(facemash.SupportedPackage.mediapipeFacemesh)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Webcam ref={webcamRef} className='webcam'/>
        <canvas ref={canvasRef} className='canvas'/>
      </header>
    </div>
  )
}

export default App