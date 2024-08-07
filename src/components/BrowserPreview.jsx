import React from 'react';

const BrowserPreview = ({ codebase }) => {
  const htmlContent = codebase && codebase['index.html'] ? codebase['index.html'] : '<h1>No HTML file found</h1>';

  return (
    <div className="h-full bg-white rounded overflow-hidden">
      <div className="bg-gray-200 p-2 flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <div className="flex-grow bg-white rounded px-2 py-1 text-sm">Preview</div>
      </div>
      <iframe
        srcDoc={htmlContent}
        title="Preview"
        sandbox="allow-scripts"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default BrowserPreview;
