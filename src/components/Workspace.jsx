import React, { useState, useEffect } from 'react';
import { Terminal, Columns, Code, Globe, Mic } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from './CodeEditor';
import TerminalComponent from './TerminalComponent';
import Planner from './Planner';
import BrowserPreview from './BrowserPreview';
import VisualProgramming from './VisualProgramming';
import VoiceInput from './VoiceInput';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Workspace = ({ 
  onSubmit, 
  isLoading, 
  error, 
  result, 
  codebase = {}, 
  appName, 
  setAppName, 
  appDescription, 
  setAppDescription,
  activeComponent,
  currentStatus,
  onFeedback
}) => {
  const handleFeedback = (feedback) => {
    if (onFeedback) {
      onFeedback(feedback);
    }
  };
  const [activeTab, setActiveTab] = useState('codeEditor');

  useEffect(() => {
    if (activeComponent) {
      setActiveTab(activeComponent);
    }
  }, [activeComponent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(appName, appDescription);
  };

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <motion.header 
        className="bg-gray-800 p-4 shadow-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white">CodeGenie Workspace</h1>
      </motion.header>
      <div className={`flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'} p-4 space-y-4 ${isMobile ? '' : 'space-y-0 space-x-4'}`}>
        <motion.div 
          className={`w-full ${isMobile ? '' : 'lg:w-1/2'} glassmorphism rounded-lg p-6`}
          initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center mb-6">
            <motion.img 
              src="/placeholder.svg" 
              alt="AI Avatar" 
              className="w-12 h-12 rounded-full mr-4 animate-float"
            />
            <p className="text-lg text-white">Hello, I am CodeGenie, an AI Software Engineer. What would you like me to build you today?</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter app name..."
            />
            <textarea
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              className="w-full h-32 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter app description..."
            />
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Processing...' : 'Create App'}
            </motion.button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {currentStatus && (
            <p className="mt-4 text-white">Current Status: {currentStatus}</p>
          )}
          {result && (
            <ScrollArea className="mt-6 p-4 bg-gray-700 rounded-lg h-64 lg:h-96">
              <h2 className="text-xl font-bold mb-2 text-white">Result:</h2>
              <pre className="whitespace-pre-wrap text-sm text-gray-300">{result}</pre>
            </ScrollArea>
          )}
        </motion.div>
        <motion.div 
          className={`w-full ${isMobile ? '' : 'lg:w-1/2'} glassmorphism rounded-lg p-6`}
          initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} justify-start mb-4`}>
              <TabsTrigger value="codeEditor" className="flex-grow"><Code className="mr-2 h-4 w-4" /> Code Editor</TabsTrigger>
              <TabsTrigger value="terminal" className="flex-grow"><Terminal className="mr-2 h-4 w-4" /> Terminal</TabsTrigger>
              <TabsTrigger value="planner" className="flex-grow"><Columns className="mr-2 h-4 w-4" /> Planner</TabsTrigger>
              <TabsTrigger value="browser" className="flex-grow"><Globe className="mr-2 h-4 w-4" /> Browser</TabsTrigger>
              <TabsTrigger value="visualProgramming" className="flex-grow"><Code className="mr-2 h-4 w-4" /> Visual Programming</TabsTrigger>
              <TabsTrigger value="voiceInput" className="flex-grow"><Mic className="mr-2 h-4 w-4" /> Voice Input</TabsTrigger>
            </TabsList>
            <TabsContent value="codeEditor">
              <CodeEditor codebase={codebase} onFeedback={onFeedback} />
            </TabsContent>
            <TabsContent value="terminal">
              <TerminalComponent />
            </TabsContent>
            <TabsContent value="planner">
              <Planner />
            </TabsContent>
            <TabsContent value="browser">
              <BrowserPreview codebase={codebase || {}} />
            </TabsContent>
            <TabsContent value="visualProgramming">
              <VisualProgramming onUpdate={handleFeedback} />
            </TabsContent>
            <TabsContent value="voiceInput">
              <VoiceInput onTranscript={handleFeedback} />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Workspace;
