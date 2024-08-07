import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ArrowLeft } from "lucide-react"
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
  const [codebase, setCodebase] = useState({});
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [activeComponent, setActiveComponent] = useState('codeEditor');
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    if (settings) {
      setErebusAgent(new ErebusAgent(settings.apiKey, settings.model));
    }
  }, [settings]);

  const handleSubmit = async (name, description) => {
    if (!erebusAgent) {
      setError('Please configure the settings first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const updateCallback = (component, status) => {
        setActiveComponent(component);
        setCurrentStatus(status);
      };
      const agentResult = await erebusAgent.process(name, description, updateCallback, handleFeedback);
      setResult(JSON.stringify(agentResult, null, 2));
      setCodebase(agentResult.codebase);
    } catch (err) {
      setError('An error occurred while processing your request. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = (feedback) => {
    console.log('User feedback:', feedback);
    if (erebusAgent) {
      erebusAgent.learn(feedback);
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <AnimatePresence mode="wait">
        {showSettings ? (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <SettingsMenu onSave={handleSaveSettings} />
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Workspace
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              result={result}
              codebase={codebase}
              appName={appName}
              setAppName={setAppName}
              appDescription={appDescription}
              setAppDescription={setAppDescription}
              activeComponent={activeComponent}
              currentStatus={currentStatus}
              onFeedback={handleFeedback}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showSettings ? <ArrowLeft size={24} /> : <Settings size={24} />}
      </motion.button>
    </div>
  );
};

export default Index;
