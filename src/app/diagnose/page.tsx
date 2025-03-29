'use client';

import * as faceapi from 'face-api.js';
import { useEffect, useRef } from 'react';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

    const result = detections.map((detection) => {
      const hairBrightColorCode = getHairBrightColorCode(detection, ctx);
      const hairDarkColorCode = getHairDarkColorCode(detection, ctx);
      const skinBrightColorCode = getSkinBrightColorCode(detection, ctx);
      const skinDarkColorCode = getSkinDarkColorCode(detection, ctx);
      const eyeColorCode = getEyeColorCode(detection, ctx);

      // カラーコードをここで配列にして返す
      return {
        hairBrightColorCode,
        hairDarkColorCode,
        skinBrightColorCode,
        skinDarkColorCode,
        eyeColorCode,
      };
    });
    console.log(result);
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

  // 髪の明るい色
  const getHairBrightColorCode = (detection: any, ctx: any) => {
    const jawOutLinePoints = detection.landmarks.getJawOutline();
    const jawOutLineTip0 = jawOutLinePoints[0];
    const jawOutLineTip4 = jawOutLinePoints[4];
    const jawOutLineTip8 = jawOutLinePoints[8];

    const hairDarkBoxSize = 5;
    const startHairDarkStartX = jawOutLineTip8._x;
    const startHairBrightStartY =
      jawOutLineTip0._y - (jawOutLineTip4._y - jawOutLineTip0._y);

    const hairDarkData = ctx.getImageData(
      startHairDarkStartX,
      startHairBrightStartY,
      hairDarkBoxSize,
      hairDarkBoxSize,
    );
    const { r, g, b } = calculateAverageColor(hairDarkData.data);
    const hairBrightColorCode = rgbToHex(r, g, b);

    ctx.font = '5px Arial';
    ctx.fillStyle = 'pink';
    ctx.fillText('★', startHairDarkStartX, startHairBrightStartY);

    return hairBrightColorCode;
  };

  // 髪の暗い色
  const getHairDarkColorCode = (detection: any, ctx: any) => {
    const jawOutLinePoints = detection.landmarks.getJawOutline();
    const jawOutLineTip = jawOutLinePoints[0];
    const hairDarkBoxSize = 5;
    const startHairDarkStartX = Math.max(
      0,
      Math.round(jawOutLineTip.x + 3 - hairDarkBoxSize / 2),
    );
    const startHairDarkStartY = Math.max(
      0,
      Math.round(jawOutLineTip.y - 3 - hairDarkBoxSize / 2),
    );
    const hairDarkData = ctx.getImageData(
      startHairDarkStartX,
      startHairDarkStartY,
      hairDarkBoxSize,
      hairDarkBoxSize,
    );
    const { r, g, b } = calculateAverageColor(hairDarkData.data);
    const hairDarkColorCode = rgbToHex(r, g, b);

    ctx.font = '5px Arial';
    ctx.fillStyle = 'green';
    ctx.fillText('★', startHairDarkStartX, startHairDarkStartY);

    return hairDarkColorCode;
  };

  // 肌の明るい色
  const getSkinBrightColorCode = (detection: any, ctx: any) => {
    // 輪郭の点
    const jawOutLinePoints = detection.landmarks.getJawOutline();
    const jawOutLineTip = jawOutLinePoints[2];

    // ctx.font = '5px Arial';
    // ctx.fillStyle = 'blue';
    // ctx.fillText('★', jawOutLineTip.x, jawOutLineTip.y);

    // 鼻の点
    const nosePoints = detection.landmarks.getNose();
    const noseTip = nosePoints[4];

    // ctx.font = '5px Arial';
    // ctx.fillStyle = 'green';
    // ctx.fillText('★', noseTip.x, noseTip.y);

    const skinBrightBoxSize = 15;
    const startSkinBrightStartX = (jawOutLineTip.x + noseTip.x) / 2;
    const startSkinBrightStartY = (jawOutLineTip.y + noseTip.y) / 2;

    const skinBrightData = ctx.getImageData(
      startSkinBrightStartX,
      startSkinBrightStartY,
      skinBrightBoxSize,
      skinBrightBoxSize,
    );
    const { r, g, b } = calculateAverageColor(skinBrightData.data);
    const skinBrightColorCode = rgbToHex(r, g, b);

    ctx.font = '5px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('★', startSkinBrightStartX, startSkinBrightStartY);

    return skinBrightColorCode;
  };

  // 肌の暗い色
  const getSkinDarkColorCode = (detection: any, ctx: any) => {
    const nosePoints = detection.landmarks.getNose();
    const noseTip = nosePoints[5];

    const skinDarkBoxSize = 5;
    const startSkinDarkStartX = Math.max(
      0,
      Math.round(noseTip.x - 23 - skinDarkBoxSize / 2),
    );
    const startSkinDarkStartY = Math.max(0, Math.round(noseTip.y - skinDarkBoxSize / 2));

    const skinDarkData = ctx.getImageData(
      startSkinDarkStartX,
      startSkinDarkStartY,
      skinDarkBoxSize,
      skinDarkBoxSize,
    );
    const { r, g, b } = calculateAverageColor(skinDarkData.data);
    const skinDarkColorCode = rgbToHex(r, g, b);

    ctx.font = '5px Arial';
    ctx.fillStyle = 'purple';
    ctx.fillText('★', startSkinDarkStartX, startSkinDarkStartY);

    return skinDarkColorCode;
  };

  // 瞳の色
  const getEyeColorCode = (detection: any, ctx: any) => {
    const nosePoints = detection.landmarks.getLeftEye();
    const noseTip1 = nosePoints[1];
    const noseTip4 = nosePoints[4];

    const midX = (noseTip1._x + noseTip4._x) / 2;
    const midY = (noseTip1._y + noseTip4._y) / 2;

    const boxSize = 5;
    const startX = Math.max(0, Math.round(midX - boxSize / 2));
    const startY = Math.max(0, Math.round(midY - boxSize / 2));

    const imageData = ctx.getImageData(startX, startY, boxSize, boxSize);
    const { r, g, b } = calculateAverageColor(imageData.data);
    const eyeColorCode = rgbToHex(r, g, b);

    ctx.font = '5px Arial';
    ctx.fillStyle = 'yellow';
    ctx.fillText('★', startX, startY);

    return eyeColorCode;
  };

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/face_api_models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
        ]);
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

    const checkFaceAndAnalyze = async () => {
      if (!videoRef.current) return;

      const video = videoRef.current;
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors()
        .withAgeAndGender();

      // カメラに一人の顔が映った時にカラーコードを取得するようにする
      if (detections.length === 1) {
        console.log('顔認証');
        handleCaptureAndAnalyze();

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          console.log('顔認識成功 → setInterval停止');
        }
      } else {
        alert('カメラに顔を映してください（複数人NG）');
      }
    };

    loadModels();

    intervalRef.current = setInterval(checkFaceAndAnalyze, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted className="w-screen h-screen object-cover" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
