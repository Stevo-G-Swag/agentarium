import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ArrowLeft, Code, Terminal, Layout, Globe, Mic } from "lucide-react"
import { ErebusAgent } from '../agents/ErebusAgent';
import Workspace from '../components/Workspace';
import SettingsMenu from '../components/SettingsMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white">
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
            className="p-6"
          >
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center">CodeGenie AI</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-4">Create Your App</h2>
                  <Input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="Enter app name..."
                    className="mb-4"
                  />
                  <Textarea
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                    placeholder="Enter app description..."
                    className="mb-4"
                  />
                  <Button
                    onClick={() => handleSubmit(appName, appDescription)}
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? 'Processing...' : 'Create App'}
                  </Button>
                  {error && <p className="text-red-500 mt-4">{error}</p>}
                  {currentStatus && (
                    <p className="mt-4">Current Status: {currentStatus}</p>
                  )}
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
                  <Tabs value={activeComponent} onValueChange={setActiveComponent}>
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="codeEditor"><Code className="mr-2" /> Code</TabsTrigger>
                      <TabsTrigger value="terminal"><Terminal className="mr-2" /> Terminal</TabsTrigger>
                      <TabsTrigger value="planner"><Layout className="mr-2" /> Planner</TabsTrigger>
                      <TabsTrigger value="browser"><Globe className="mr-2" /> Preview</TabsTrigger>
                      <TabsTrigger value="voiceInput"><Mic className="mr-2" /> Voice</TabsTrigger>
                    </TabsList>
                    <TabsContent value="codeEditor">
                      <Workspace
                        activeComponent={activeComponent}
                        codebase={codebase}
                        onFeedback={handleFeedback}
                      />
                    </TabsContent>
                    <TabsContent value="terminal">
                      <Workspace
                        activeComponent={activeComponent}
                        codebase={codebase}
                        onFeedback={handleFeedback}
                      />
                    </TabsContent>
                    <TabsContent value="planner">
                      <Workspace
                        activeComponent={activeComponent}
                        codebase={codebase}
                        onFeedback={handleFeedback}
                      />
                    </TabsContent>
                    <TabsContent value="browser">
                      <Workspace
                        activeComponent={activeComponent}
                        codebase={codebase}
                        onFeedback={handleFeedback}
                      />
                    </TabsContent>
                    <TabsContent value="voiceInput">
                      <Workspace
                        activeComponent={activeComponent}
                        codebase={codebase}
                        onFeedback={handleFeedback}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              {result && (
                <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
                  <h2 className="text-2xl font-semibold mb-4">Result</h2>
                  <pre className="whitespace-pre-wrap text-sm">{result}</pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed bottom-6 right-6 p-4 bg-white text-indigo-900 rounded-full shadow-lg hover:bg-indigo-100 transition duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {showSettings ? <ArrowLeft size={24} /> : <Settings size={24} />}
      </motion.button>
    </div>
  );
};

export default Index;
