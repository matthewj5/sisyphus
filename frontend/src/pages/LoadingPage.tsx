import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

export function LoadingPage() {
  const { setCurrentPage, questionnaire } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      // If questionnaire is already completed, skip to timer page
      if (questionnaire.questionnaireCompleted) {
        setCurrentPage('timer');
      } else {
        setCurrentPage('questionnaire');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-earth-light-sand">
      <svg viewBox="0 0 400 400" className="w-full max-w-md">
        {/* Sun */}
        <circle cx="60" cy="60" r="30" fill="#fbbf24" opacity="0.9" />
        <circle cx="60" cy="60" r="35" fill="#fbbf24" opacity="0.3" />

        {/* Hill with texture */}
        <defs>
          <pattern id="rockTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="2" fill="#5a6472" opacity="0.3" />
            <circle cx="15" cy="12" r="1.5" fill="#3a4350" opacity="0.4" />
            <circle cx="10" cy="15" r="1" fill="#5a6472" opacity="0.3" />
          </pattern>
        </defs>
        <path
          d="M 0 400 L 0 300 Q 100 250, 200 200 Q 300 150, 400 100 L 400 400 Z"
          fill="url(#rockTexture)"
          stroke="none"
        />
        <path
          d="M 0 400 L 0 300 Q 100 250, 200 200 Q 300 150, 400 100 L 400 400 Z"
          fill="#4a5568"
          fillOpacity="0.7"
          stroke="#2d3748"
          strokeWidth="2"
        />

        {/* Rocky details */}
        <ellipse cx="80" cy="280" rx="15" ry="10" fill="#3a4350" opacity="0.4" />
        <ellipse cx="150" cy="230" rx="20" ry="12" fill="#3a4350" opacity="0.3" />
        <ellipse cx="250" cy="180" rx="18" ry="10" fill="#3a4350" opacity="0.4" />
        <ellipse cx="320" cy="140" rx="15" ry="8" fill="#3a4350" opacity="0.3" />

        {/* Sisyphus */}
        <g className="animate-sisyphus-walk" style={{ transformOrigin: '120px 270px' }}>
          <ellipse cx="120" cy="270" rx="12" ry="18" fill="#d4a574" />
          <circle cx="120" cy="255" r="8" fill="#d4a574" />
          <line x1="120" y1="265" x2="135" y2="265" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />
          <line x1="120" y1="280" x2="115" y2="295" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />
          <line x1="120" y1="280" x2="125" y2="295" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Boulder */}
        <g className="animate-boulder-roll" style={{ transformOrigin: '150px 260px' }}>
          <circle cx="150" cy="260" r="20" fill="#6b7280" stroke="#4b5563" strokeWidth="2" />
          <circle cx="145" cy="255" r="3" fill="#9ca3af" opacity="0.5" />
          <circle cx="155" cy="265" r="2" fill="#9ca3af" opacity="0.5" />
        </g>

        {/* Loading text */}
        <text x="200" y="365" textAnchor="middle" fill="#94a3b8" fontSize="18" fontFamily="sans-serif">
          Loading...
        </text>
      </svg>
    </div>
  );
}
