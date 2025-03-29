'use client';

import * as faceapi from 'face-api.js';
import { useCallback, useEffect, useRef } from 'react';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const BOX_SIZE = 5;

  const getFaceColorCodeData = (detections: any[], ctx: CanvasRenderingContext2D) => {
    const result = detections.map((detection) => ({
      hairBrightColorCode: getHairBrightColorCode(detection, ctx),
      hairDarkColorCode: getHairDarkColorCode(detection, ctx),
      skinBrightColorCode: getSkinBrightColorCode(detection, ctx),
      skinDarkColorCode: getSkinDarkColorCode(detection, ctx),
      eyeColorCode: getEyeColorCode(detection, ctx),
    }));

    console.log(result[0]);
  };

  const handleCaptureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // canvasにカメラで撮った画像を描画
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const detections = await analyzeFace(video);
    getFaceColorCodeData(detections, ctx);
  }, [getFaceColorCodeData]);

  const analyzeFace = async (video: HTMLVideoElement) => {
    return await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender();
  };

  const calculateAverageColor = (ctx: any, startX: number, startY: number) => {
    const color = { red: 0, green: 0, blue: 0 };
    let count = 0;
    const data = ctx.getImageData(startX, startY, BOX_SIZE, BOX_SIZE).data;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha > 0) {
        color.red += data[i];
        color.green += data[i + 1];
        color.blue += data[i + 2];
        count++;
      }
    }

    return rgbToHex(
      Math.round(color.red / count),
      Math.round(color.green / count),
      Math.round(color.blue / count),
    );
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  // 髪の明るい色
  const getHairBrightColorCode = (detection: any, ctx: any) => {
    const jawOutLinePoints = detection.landmarks.getJawOutline();
    const startX = jawOutLinePoints[8]._x;
    const startY =
      jawOutLinePoints[0]._y - (jawOutLinePoints[4]._y - jawOutLinePoints[0]._y);

    drawStar(ctx, startX, startY, 'pink');

    return calculateAverageColor(ctx, startX, startY);
  };

  // 髪の暗い色
  const getHairDarkColorCode = (detection: any, ctx: any) => {
    const jawOutLineTip = detection.landmarks.getJawOutline()[0];
    const OFFSET_X = 3;
    const startX = Math.max(0, Math.round(jawOutLineTip.x + OFFSET_X - BOX_SIZE / 2));
    const startY = Math.max(0, Math.round(jawOutLineTip.y - OFFSET_X - BOX_SIZE / 2));

    drawStar(ctx, startX, startY, 'green');

    return calculateAverageColor(ctx, startX, startY);
  };

  // 肌の明るい色
  const getSkinBrightColorCode = (detection: any, ctx: any) => {
    const jawOutLinePoints = detection.landmarks.getJawOutline();
    const nosePoints = detection.landmarks.getNose();
    const startX = (jawOutLinePoints[2].x + nosePoints[4].x) / 2;
    const startY = (jawOutLinePoints[2].y + nosePoints[4].y) / 2;

    drawStar(ctx, startX, startY, 'red');

    return calculateAverageColor(ctx, startX, startY);
  };

  // 肌の暗い色
  const getSkinDarkColorCode = (detection: any, ctx: any) => {
    const nosePoints = detection.landmarks.getNose();
    const OFFSET_X = 23;
    const startX = Math.max(0, Math.round(nosePoints[5].x - OFFSET_X - BOX_SIZE / 2));
    const startY = Math.max(0, Math.round(nosePoints[5].y - BOX_SIZE / 2));

    drawStar(ctx, startX, startY, 'purple');

    return calculateAverageColor(ctx, startX, startY);
  };

  // 瞳の色
  const getEyeColorCode = (detection: any, ctx: any) => {
    const nosePoints = detection.landmarks.getLeftEye();
    const midX = (nosePoints[1]._x + nosePoints[4]._x) / 2;
    const midY = (nosePoints[1]._y + nosePoints[4]._y) / 2;
    const startX = Math.max(0, Math.round(midX - BOX_SIZE / 2));
    const startY = Math.max(0, Math.round(midY - BOX_SIZE / 2));

    drawStar(ctx, startX, startY, 'yellow');

    return calculateAverageColor(ctx, startX, startY);
  };

  const drawStar = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    color: string,
  ) => {
    ctx.font = '5px Arial';
    ctx.fillStyle = color;
    ctx.fillText('★', startX, startY);
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
      const detections = await analyzeFace(video);

      // カメラに一人の顔が映った時にカラーコードを取得するようにする
      if (detections.length === 1) {
        console.log('1 顔認証開始');
        handleCaptureAndAnalyze();

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          console.log('2 顔認識成功 → setInterval停止');
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
      <video ref={videoRef} autoPlay muted className="h-screen w-screen object-cover" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
