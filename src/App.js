import { useRef, useEffect } from 'react';
import './App.css';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';
import { drawMesh } from './utils';

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set video width & height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width & height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Face detection
      const face = await net.estimateFaces({ input: video });

      const ctx = canvasRef.current.getContext('2d');
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  useEffect(() => {
    runFacemesh();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} className="webcam" />
        <canvas ref={canvasRef} className="canvas" />
      </header>
    </div>
  );
};

export default App;
