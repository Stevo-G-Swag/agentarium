import { useState, useEffect } from 'react';
import { Loader2 } from "lucide-react"
import { ErebusAgent } from '../agents/ErebusAgent';
import Workspace from '../components/Workspace';
import SettingsMenu from '../components/SettingsMenu';

const Index = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [erebusAgent, setErebusAgent] = useState(null);

  useEffect(() => {
    if (settings) {
      setErebusAgent(new ErebusAgent(settings.apiKey, settings.model));
    }
  }, [settings]);

  const handleSubmit = async (query) => {
    if (!erebusAgent) {
      setError('Please configure the settings first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const agentResult = await erebusAgent.process(query);
      setResult(agentResult);
    } catch (err) {
      setError('An error occurred while processing your query. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {showSettings ? (
        <SettingsMenu onSave={handleSaveSettings} />
      ) : (
        <Workspace
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          result={result}
        />
      )}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-4 right-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
      >
        {showSettings ? 'Back to Workspace' : 'Settings'}
      </button>
    </div>
  );
};

export default Index;
