import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';
import { handleError } from '../utils/errorHandling';

export function useCamera() {
  const { camera, setCameraStream } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false,
      });

      setCameraStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      handleError(error, {
        action: 'camera_access',
        userMessage: 'Failed to access camera. Please grant camera permissions.',
        shouldAlert: true,
      });
    }
  };

  const stopCamera = () => {
    if (camera.cameraStream) {
      camera.cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    cameraStream: camera.cameraStream,
    startCamera,
    stopCamera,
  };
}
