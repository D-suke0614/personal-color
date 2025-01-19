'use client';

import * as faceapi from 'face-api.js';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCaptureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Analyze the image using face-api.js
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender();

    if (detections.length === 0) {
      alert('No faces detected.');
      return;
    }

    // Clear the canvas and draw the detections
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceLandmarks(canvas, detections);

    detections.forEach((detection) => {
      const { age, gender } = detection;
      const { x, y } = detection.detection.box;
      const nosePoints = detection.landmarks.getLeftEye();
      console.log(nosePoints);
      const noseTip = nosePoints[2];

      const boxSize = 10; // Size of the area around the nose
      const startX = Math.max(0, Math.round(noseTip.x - boxSize / 2)) - 5;
      const startY = Math.max(0, Math.round(noseTip.y - boxSize / 2)) + 10;

      const noseData = ctx.getImageData(startX, startY, boxSize, boxSize);
      const { r, g, b } = calculateAverageColor(noseData.data);

      // Convert RGB to hex color code
      const colorCode = rgbToHex(r, g, b);
      console.log(colorCode);
      const text = `${Math.round(age)} years old, ${gender}, Average Color: ${colorCode}`;
      ctx.fillStyle = 'red';
      // ctx.fillText('★', startX, startY);
      ctx.fillText(text, x + 45, y - 5);
    });
  };

  const calculateAverageColor = (data: Uint8ClampedArray) => {
    let r = 0,
      g = 0,
      b = 0;
    let count = 0;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
    }

    return {
      r: Math.round(r / count),
      g: Math.round(g / count),
      b: Math.round(b / count),
    };
  };

  function rgbToHex(r: number, g: number, b: number) {
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
        console.log('Models loaded successfully');
      } catch (error) {
        console.error('Error loading models:', error);
      }

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: {} })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Error starting video:', err));
    };

    loadModels();
  }, []);

  return (
    <main id="main">
      <button onClick={handleCaptureAndAnalyze}>Capture and Analyze</button>
      <h1>Face Recognition with Next.js</h1>
      <video
        // className="absolute"
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
      />
      <canvas ref={canvasRef} style={{ display: 'block' }} />
    </main>
  );
}
