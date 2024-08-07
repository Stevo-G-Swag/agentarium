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

const Workspace = ({ 
  onSubmit, 
  isLoading, 
  error, 
  result, 
  codebase, 
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

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">CodeGenie Workspace</h1>
      </header>
      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 border-b lg:border-b-0 lg:border-r border-gray-700">
          <div className="flex items-center mb-4">
            <img src="/placeholder.svg" alt="AI Avatar" className="w-8 h-8 rounded-full mr-2" />
            <p className="text-sm lg:text-base">Hello, I am CodeGenie, an AI Software Engineer. What would you like me to build you today?</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 space-y-2">
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white rounded text-sm lg:text-base"
              placeholder="Enter app name..."
            />
            <textarea
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              className="w-full h-24 p-2 bg-gray-700 text-white rounded text-sm lg:text-base"
              placeholder="Enter app description..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500 text-sm lg:text-base"
            >
              {isLoading ? 'Processing...' : 'Create App'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2 text-sm lg:text-base">{error}</p>}
          {currentStatus && (
            <p className="mt-2 text-sm lg:text-base">Current Status: {currentStatus}</p>
          )}
          {result && (
            <ScrollArea className="mt-4 p-4 bg-gray-700 rounded h-64 lg:h-96">
              <h2 className="text-lg lg:text-xl font-bold mb-2">Result:</h2>
              <pre className="whitespace-pre-wrap text-sm lg:text-base">{result}</pre>
            </ScrollArea>
          )}
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap justify-start">
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
        </div>
      </div>
    </div>
  );
};

export default Workspace;
