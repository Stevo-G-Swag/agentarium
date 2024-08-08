import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ArrowLeft, Code, Terminal, Layout, Globe, Mic } from "lucide-react"
import { toast } from "sonner"
import ErrorBoundary from '../components/ErrorBoundary';
import Workspace from '../components/Workspace';
import SettingsMenu from '../components/SettingsMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const Index = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [codebase, setCodebase] = useState({});
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [activeComponent, setActiveComponent] = useState('codeEditor');
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (name, description) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulating API call or processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResult(`App "${name}" created successfully!\nDescription: ${description}`);
      setCodebase({
        'index.html': '<h1>Hello, World!</h1>',
        'styles.css': 'body { font-family: Arial, sans-serif; }',
        'script.js': 'console.log("App initialized");'
      });
    } catch (err) {
      setError('Failed to create app. Please try again.');
      console.error('Error in handleSubmit:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
    toast.success('Settings saved successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-bold">Loading CodeGenie AI...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
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
              <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-center">CodeGenie AI</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 shadow-xl">
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Create Your App</h2>
                  <Input
                    type="text"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                    placeholder="Enter app name..."
                    className="mb-3 md:mb-4 placeholder-white/50"
                  />
                  <Textarea
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                    placeholder="Enter app description..."
                    className="mb-3 md:mb-4 placeholder-white/50"
                  />
                  <Button
                    onClick={() => handleSubmit(appName, appDescription)}
                    disabled={isLoading}
                    className="w-full text-sm md:text-base"
                  >
                    {isLoading ? 'Processing...' : 'Create App'}
                  </Button>
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                      <strong className="font-bold">Error: </strong>
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}
                  {currentStatus && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mt-4" role="alert">
                      <strong className="font-bold">Current Status: </strong>
                      <span className="block sm:inline">{currentStatus}</span>
                    </div>
                  )}
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl">
                  <Tabs value={activeComponent} onValueChange={setActiveComponent}>
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
                      <TabsTrigger value="codeEditor" className="text-xs md:text-sm"><Code className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Code</TabsTrigger>
                      <TabsTrigger value="terminal" className="text-xs md:text-sm"><Terminal className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Terminal</TabsTrigger>
                      <TabsTrigger value="planner" className="text-xs md:text-sm"><Layout className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Planner</TabsTrigger>
                      <TabsTrigger value="browser" className="text-xs md:text-sm"><Globe className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Preview</TabsTrigger>
                      <TabsTrigger value="voiceInput" className="text-xs md:text-sm"><Mic className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" /> Voice</TabsTrigger>
                    </TabsList>
                    <TabsContent value="codeEditor">
                      <Workspace
                        activeComponent="codeEditor"
                        codebase={codebase}
                        onFeedback={(feedback) => console.log('Feedback:', feedback)}
                      />
                    </TabsContent>
                    <TabsContent value="terminal">
                      <Workspace
                        activeComponent="terminal"
                        codebase={codebase}
                        onFeedback={(feedback) => console.log('Feedback:', feedback)}
                      />
                    </TabsContent>
                    <TabsContent value="planner">
                      <Workspace
                        activeComponent="planner"
                        codebase={codebase}
                        onFeedback={(feedback) => console.log('Feedback:', feedback)}
                      />
                    </TabsContent>
                    <TabsContent value="browser">
                      <Workspace
                        activeComponent="browser"
                        codebase={codebase}
                        onFeedback={(feedback) => console.log('Feedback:', feedback)}
                      />
                    </TabsContent>
                    <TabsContent value="voiceInput">
                      <Workspace
                        activeComponent="voiceInput"
                        codebase={codebase}
                        onFeedback={(feedback) => console.log('Feedback:', feedback)}
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
    </ErrorBoundary>
  );
};

export default Index;
