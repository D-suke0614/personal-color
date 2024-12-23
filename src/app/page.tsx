'use client';

import * as faceapi from 'face-api.js';
import { useEffect, useRef } from 'react';

export default function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // handleVideoPlayをコンポーネントのスコープ内に定義
  const handleVideoPlay = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = faceapi.createCanvasFromMedia(video);

    if (canvasRef.current) {
      canvasRef.current.replaceWith(canvas);
    }
    canvasRef.current = canvas;
    canvas.className = 'absolute';
    const mainEl = document.getElementById('main');
    if (!mainEl) return;
    mainEl.style.position = 'relative';
    mainEl.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withAgeAndGender();

      console.log('detections', detections);

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      resizedDetections.forEach((detection) => {
        const { age, gender } = detection;
        const { x, y } = detection.detection.box;

        const text = `${Math.round(age)} years old, ${gender}`;
        ctx.fillStyle = 'red';
        ctx.fillText(text, x + 45, y - 5); // 顔の上部に表示
      });
    }, 1000);
  };

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
      <h1>Face Recognition with Next.js</h1>
      <video
        className="absolute"
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        onPlay={handleVideoPlay}
      />
    </main>
  );
}
