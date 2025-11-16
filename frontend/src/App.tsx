import { AppProvider, useAppContext } from './context/AppContext';
import { LoadingPage } from './pages/LoadingPage';
import { QuestionnairePage } from './pages/QuestionnairePage';
import { TimerPage } from './pages/TimerPage';
import { CameraPage } from './pages/CameraPage';
import { HellPage } from './pages/HellPage';

function AppContent() {
  const { currentPage } = useAppContext();

  // Simple page routing based on currentPage state
  switch (currentPage) {
    case 'loading':
      return <LoadingPage />;
    case 'questionnaire':
      return <QuestionnairePage />;
    case 'timer':
      return <TimerPage />;
    case 'camera':
      return <CameraPage />;
    case 'hell':
      return <HellPage />;
    default:
      return <LoadingPage />;
  }
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
