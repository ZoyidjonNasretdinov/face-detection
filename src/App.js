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

  const detect = async(net) => {
    if(typeof webcamRef.current !== 'undefined' && 
      webcamRef.current !== null && 
      webcamRef.current.video.readyState === 4 
    ){

      const video = webcamRef.current.video
      const videoWidth = webcamRef.current.video.videoWidth
      const videoHeigth = webcamRef.current.video.videoHeigth


      webcamRef.current.video.width = videoWidth
      webcamRef.current.video.heigth =videoHeigth

      canvasRef.current.width = videoWidth
      canvasRef.current.heigth = videoHeigth
    }
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