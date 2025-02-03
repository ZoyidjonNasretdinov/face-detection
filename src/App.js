import { useRef, useEffect, useCallback } from 'react';
import './App.css';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';
import { drawMesh } from './utils';

const App = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const detect = useCallback(async (model) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const faces = await model.estimateFaces({ input: video });

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, videoWidth, videoHeight);
      drawMesh(faces, ctx);
    }
  }, []);

  const runFaceDetection = useCallback(async () => {
    const model = await faceLandmarksDetection.load(
      faceLandmarksDetection.SupportedPackages.mediapipeFacemesh || {},
      {
        runtime: 'tfjs',
      }
    );

    const detectionInterval = setInterval(() => {
      detect(model);
    }, 100);

    return () => clearInterval(detectionInterval);
  }, [detect]);

  useEffect(() => {
    const cleanup = runFaceDetection();
    return () => cleanup.then((clear) => clear && clear());
  }, [runFaceDetection]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} className="webcam" muted playsInline />
        <canvas ref={canvasRef} className="canvas" />
      </header>
    </div>
  );
};

export default App;