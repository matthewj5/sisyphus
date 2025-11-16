import type { RefObject } from 'react';
import { useAppContext } from '../context/AppContext';
import type { CapturedImage } from '../types';

export function useImageCapture() {
  const { camera, addCapturedImage, removeCapturedImage, clearCapturedImages } = useAppContext();

  const capturePhoto = (videoRef: RefObject<HTMLVideoElement | null>) => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

    const image: CapturedImage = {
      type: 'camera',
      data: dataUrl,
      timestamp: Date.now(),
    };

    addCapturedImage(image);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);

    for (const file of fileArray) {
      // Convert file to base64
      const reader = new FileReader();

      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;

        const image: CapturedImage = {
          type: 'upload',
          data: dataUrl,
          timestamp: Date.now(),
          filename: file.name,
        };

        addCapturedImage(image);
      };

      reader.readAsDataURL(file);
    }

    // Reset input
    event.target.value = '';
  };

  return {
    capturedImages: camera.capturedImages,
    capturePhoto,
    handleFileUpload,
    removeCapturedImage,
    clearCapturedImages,
  };
}
