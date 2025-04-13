'use client';

import * as faceapi from 'face-api.js';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const BOX_SIZE = 5;

  type AnalyzedColorCodes = {
    hairBrightColorCode: string;
    hairDarkColorCode: string;
    skinBrightColorCode: string;
    skinDarkColorCode: string;
    eyeColorCode: string;
  };

  const rgbToHex = useCallback((r: number, g: number, b: number) => {
    const toHex = (value: number) => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }, []);

  const calculateAverageColor = useCallback(
    (ctx: CanvasRenderingContext2D, startX: number, startY: number) => {
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
    },
    [rgbToHex],
  );

  // 髪の明るい色
  const getHairBrightColorCode = useCallback(
    (
      detection: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >,
      ctx: CanvasRenderingContext2D,
    ) => {
      const jawOutLinePoints = detection.landmarks.getJawOutline();
      const startX = jawOutLinePoints[8].x;
      const startY =
        jawOutLinePoints[0].y - (jawOutLinePoints[4].y - jawOutLinePoints[0].y);

      drawStar(ctx, startX, startY, 'pink');

      return calculateAverageColor(ctx, startX, startY);
    },
    [calculateAverageColor],
  );

  // 髪の暗い色
  const getHairDarkColorCode = useCallback(
    (
      detection: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >,
      ctx: CanvasRenderingContext2D,
    ) => {
      const jawOutLineTip = detection.landmarks.getJawOutline()[0];
      const OFFSET_X = 3;
      const startX = Math.max(0, Math.round(jawOutLineTip.x + OFFSET_X - BOX_SIZE / 2));
      const startY = Math.max(0, Math.round(jawOutLineTip.y - OFFSET_X - BOX_SIZE / 2));

      drawStar(ctx, startX, startY, 'green');

      return calculateAverageColor(ctx, startX, startY);
    },
    [calculateAverageColor],
  );

  // 肌の明るい色
  const getSkinBrightColorCode = useCallback(
    (
      detection: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >,
      ctx: CanvasRenderingContext2D,
    ) => {
      const jawOutLinePoints = detection.landmarks.getJawOutline();
      const nosePoints = detection.landmarks.getNose();
      const startX = (jawOutLinePoints[2].x + nosePoints[4].x) / 2;
      const startY = (jawOutLinePoints[2].y + nosePoints[4].y) / 2;

      drawStar(ctx, startX, startY, 'red');

      return calculateAverageColor(ctx, startX, startY);
    },
    [calculateAverageColor],
  );

  // 肌の暗い色
  const getSkinDarkColorCode = useCallback(
    (
      detection: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >,
      ctx: CanvasRenderingContext2D,
    ) => {
      const nosePoints = detection.landmarks.getNose();
      const OFFSET_X = 23;
      const startX = Math.max(0, Math.round(nosePoints[5].x - OFFSET_X - BOX_SIZE / 2));
      const startY = Math.max(0, Math.round(nosePoints[5].y - BOX_SIZE / 2));

      drawStar(ctx, startX, startY, 'purple');

      return calculateAverageColor(ctx, startX, startY);
    },
    [calculateAverageColor],
  );

  // 瞳の色
  const getEyeColorCode = useCallback(
    (
      detection: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >,
      ctx: CanvasRenderingContext2D,
    ) => {
      const nosePoints = detection.landmarks.getLeftEye();
      const midX = (nosePoints[1].x + nosePoints[4].x) / 2;
      const midY = (nosePoints[1].y + nosePoints[4].y) / 2;
      const startX = Math.max(0, Math.round(midX - BOX_SIZE / 2));
      const startY = Math.max(0, Math.round(midY - BOX_SIZE / 2));

      drawStar(ctx, startX, startY, 'yellow');

      return calculateAverageColor(ctx, startX, startY);
    },
    [calculateAverageColor],
  );

  const getFaceColorCodeData = useCallback(
    (
      detections: faceapi.WithFaceLandmarks<
        { detection: faceapi.FaceDetection },
        faceapi.FaceLandmarks68
      >[],
      ctx: CanvasRenderingContext2D,
    ) => {
      const result: AnalyzedColorCodes[] = detections.map((detection) => ({
        hairBrightColorCode: getHairBrightColorCode(detection, ctx),
        hairDarkColorCode: getHairDarkColorCode(detection, ctx),
        skinBrightColorCode: getSkinBrightColorCode(detection, ctx),
        skinDarkColorCode: getSkinDarkColorCode(detection, ctx),
        eyeColorCode: getEyeColorCode(detection, ctx),
      }));

      return result[0];
    },
    [
      getEyeColorCode,
      getHairBrightColorCode,
      getHairDarkColorCode,
      getSkinBrightColorCode,
      getSkinDarkColorCode,
    ],
  );

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
    return getFaceColorCodeData(detections, ctx);
  }, [getFaceColorCodeData]);

  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const analyzePersonalColor = (colors: AnalyzedColorCodes) => {
    const skinBrightHSL = hexToHSL(colors.skinBrightColorCode);
    const skinDarkHSL = hexToHSL(colors.skinDarkColorCode);
    const eyeHSL = hexToHSL(colors.eyeColorCode);
    const hairBrightHSL = hexToHSL(colors.hairBrightColorCode);
    const hairDarkHSL = hexToHSL(colors.hairDarkColorCode);

    // 肌の平均値で分類
    const avgSkinHue = (skinBrightHSL.h + skinDarkHSL.h) / 2;
    const avgSkinSat = (skinBrightHSL.s + skinDarkHSL.s) / 2;
    const avgSkinLight = (skinBrightHSL.l + skinDarkHSL.l) / 2;

    const avgHairLight = (hairBrightHSL.l + hairDarkHSL.l) / 2;
    const avgEyeLight = eyeHSL.l;

    const avgLight = (avgSkinLight + avgHairLight + avgEyeLight) / 3;

    const isYellowTone = avgSkinHue >= 10 && avgSkinHue <= 45;
    const isBlueTone = avgSkinHue >= 270 || avgSkinHue <= 60;

    // シンプルなルールベース分類
    if (isYellowTone) {
      if (avgLight > 60 && avgSkinSat >= 40) router.push('/spring');
      if (avgLight <= 60) router.push('/autumn');
    } else if (isBlueTone) {
      if (avgLight > 60 && avgSkinSat < 50) router.push('/summer');
      router.push('winter');
    }

    // デフォルト fallback
    router.push('winter');
  };

  const analyzeFace = async (video: HTMLVideoElement) => {
    return await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
      .withAgeAndGender();
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
        const analyzedColorCodes = await handleCaptureAndAnalyze();
        if (analyzedColorCodes) analyzePersonalColor(analyzedColorCodes);

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
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
  }, [handleCaptureAndAnalyze]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted className="h-screen w-screen object-cover" />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
