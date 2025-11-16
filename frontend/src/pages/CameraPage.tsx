import { useState, useEffect } from 'react';
import { useCamera } from '../hooks/useCamera';
import { useImageCapture } from '../hooks/useImageCapture';
import { useTimer } from '../hooks/useTimer';
import { useAppContext } from '../context/AppContext';
import { Button } from '../components/common/Button';
import { validateTask } from '../services/api';

export function CameraPage() {
  const { videoRef, cameraStream, startCamera, stopCamera } = useCamera();
  const { capturedImages, capturePhoto, handleFileUpload, removeCapturedImage, clearCapturedImages } = useImageCapture();
  const { currentTask } = useTimer();
  const { setCurrentPage } = useAppContext();

  const [validating, setValidating] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  useEffect(() => {
    // Auto-start camera when page loads
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const handleValidate = async () => {
    if (capturedImages.length === 0) {
      alert('Please capture or upload at least one image');
      return;
    }

    if (!currentTask) {
      alert('No task found');
      return;
    }

    setValidating(true);
    setValidationMessage('🤔 Checking with Claude...');

    try {
      const images = capturedImages.map((img) => img.data);
      const result = await validateTask(images, currentTask.text);

      if (result.success) {
        // Success! Move to next task or finish
        setValidationMessage(`✅ ${result.explanation}`);
        clearCapturedImages();

        setTimeout(() => {
          setCurrentPage('timer');
        }, 2000);
      } else {
        // Failure - go to hell
        setValidationMessage(`❌ ${result.explanation}`);

        setTimeout(() => {
          setCurrentPage('hell');
        }, 2000);
      }
    } catch (error) {
      console.error('Validation error:', error);
      setValidationMessage('❌ Error validating task. Please try again.');
      setValidating(false);
    }
  };

  return (
    <div className="min-h-screen bg-earth-light-sand p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-earth-dark-brown mb-2">
            📸 Prove You're Working
          </h1>
          <p className="text-earth-brown">
            Task: <span className="font-semibold">{currentTask?.text || 'No task'}</span>
          </p>
        </div>

        {/* Camera View */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="primary" onClick={() => capturePhoto(videoRef)} disabled={!cameraStream || validating}>
              📷 Capture Photo
            </Button>

            <label className="btn btn-secondary cursor-pointer inline-block">
              📁 Upload Photos
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                disabled={validating}
              />
            </label>
          </div>
        </div>

        {/* Image Preview */}
        {capturedImages.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-earth-dark-brown">
                Captured Images ({capturedImages.length})
              </h3>
              <button onClick={clearCapturedImages} className="btn-delete" disabled={validating}>
                Clear All
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {capturedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image.data}
                    alt={`Captured ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {image.type === 'camera' ? '📸' : '📁'} {image.filename || `Image ${index + 1}`}
                  </div>
                  <button
                    onClick={() => removeCapturedImage(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={validating}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Validation Message */}
        {validationMessage && (
          <div className={`rounded-lg p-4 mb-6 text-center ${
            validationMessage.includes('✅') ? 'bg-green-100 text-green-800' :
            validationMessage.includes('❌') ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            <p className="font-semibold">{validationMessage}</p>
          </div>
        )}

        {/* Submit Button */}
        <Button
          variant="danger"
          onClick={handleValidate}
          disabled={capturedImages.length === 0 || validating}
          className="w-full"
        >
          {validating ? 'Validating...' : 'Submit for Validation'}
        </Button>
      </div>
    </div>
  );
}
