import React from 'react';
import { Terminal, Columns, Code, Globe } from 'lucide-react';

const Workspace = ({ onSubmit, isLoading, error, result }) => {
  const [query, setQuery] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 p-4">
        <h1 className="text-2xl font-bold">OpenDevin Workspace</h1>
      </header>
      <div className="flex-1 flex">
        <div className="w-1/2 p-4 border-r border-gray-700">
          <div className="flex items-center mb-4">
            <img src="/placeholder.svg" alt="AI Avatar" className="w-8 h-8 rounded-full mr-2" />
            <p>Hello, I am OpenDevin, an AI Software Engineer. What would you like me to build you today?</p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-24 p-2 bg-gray-700 text-white rounded"
              placeholder="Enter your query here..."
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-500"
            >
              {isLoading ? 'Processing...' : 'Submit'}
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {result && (
            <div className="mt-4 p-4 bg-gray-700 rounded">
              <h2 className="text-xl font-bold mb-2">Result:</h2>
              <pre className="whitespace-pre-wrap">{result}</pre>
            </div>
          )}
        </div>
        <div className="w-1/2 p-4">
          <div className="flex space-x-4 mb-4">
            <button className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              <Terminal className="mr-2" /> Terminal
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              <Columns className="mr-2" /> Planner
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              <Code className="mr-2" /> Code Editor
            </button>
            <button className="flex items-center px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
              <Globe className="mr-2" /> Browser
            </button>
          </div>
          <div className="bg-gray-800 p-4 rounded h-full">
            <p className="text-gray-400">Workspace content will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
