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
    document.body.append(canvas);

    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions(),
      );
      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 100);
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
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
    <main>
      <h1>Face Recognition with Next.js (App Router + TypeScript)</h1>
      <video
        ref={videoRef}
        autoPlay
        muted
        width="640"
        height="480"
        onPlay={handleVideoPlay} // handleVideoPlayをここで参照
      />
    </main>
  );
}
