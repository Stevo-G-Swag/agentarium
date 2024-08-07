import React, { useState } from 'react';
import { Terminal, Columns, Code, Globe } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const Workspace = ({ onSubmit, isLoading, error, result }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">CodeGenie Workspace</h1>
      </header>
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4 border-b md:border-b-0 md:border-r border-gray-700">
          <div className="flex items-center mb-4">
            <img src="/placeholder.svg" alt="AI Avatar" className="w-8 h-8 rounded-full mr-2" />
            <p className="text-sm md:text-base">Hello, I am CodeGenie, an AI Software Engineer. What would you like me to build you today?</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-24 p-2 bg-gray-700 text-white rounded text-sm md:text-base"
              placeholder="Enter your query here..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500 text-sm md:text-base"
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2 text-sm md:text-base">{error}</p>}
          {result && (
            <ScrollArea className="mt-4 p-4 bg-gray-700 rounded h-64 md:h-96">
              <h2 className="text-lg md:text-xl font-bold mb-2">Result:</h2>
              <pre className="whitespace-pre-wrap text-sm md:text-base">{result}</pre>
            </ScrollArea>
          )}
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="flex items-center px-2 py-1 md:px-4 md:py-2 bg-gray-700 rounded hover:bg-gray-600 text-xs md:text-sm">
              <Terminal className="mr-1 md:mr-2 h-4 w-4" /> Terminal
            </button>
            <button className="flex items-center px-2 py-1 md:px-4 md:py-2 bg-gray-700 rounded hover:bg-gray-600 text-xs md:text-sm">
              <Columns className="mr-1 md:mr-2 h-4 w-4" /> Planner
            </button>
            <button className="flex items-center px-2 py-1 md:px-4 md:py-2 bg-gray-700 rounded hover:bg-gray-600 text-xs md:text-sm">
              <Code className="mr-1 md:mr-2 h-4 w-4" /> Code Editor
            </button>
            <button className="flex items-center px-2 py-1 md:px-4 md:py-2 bg-gray-700 rounded hover:bg-gray-600 text-xs md:text-sm">
              <Globe className="mr-1 md:mr-2 h-4 w-4" /> Browser
            </button>
          </div>
          <ScrollArea className="bg-gray-800 p-4 rounded h-64 md:h-96">
            <p className="text-gray-400 text-sm md:text-base">Workspace content will be displayed here</p>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
