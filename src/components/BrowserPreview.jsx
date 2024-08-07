import React, { useEffect, useRef } from 'react';

const BrowserPreview = ({ codebase }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    updatePreview();
  }, [codebase]);

  const updatePreview = () => {
    const htmlContent = codebase && codebase['index.html'] ? codebase['index.html'] : '<h1>No HTML file found</h1>';
    const cssContent = codebase && codebase['styles.css'] ? `<style>${codebase['styles.css']}</style>` : '';
    const jsContent = codebase && codebase['script.js'] ? `<script>${codebase['script.js']}</script>` : '';

    const fullContent = `
      <!DOCTYPE html>
      <html>
        <head>
          ${cssContent}
        </head>
        <body>
          ${htmlContent}
          ${jsContent}
        </body>
      </html>
    `;

    if (iframeRef.current) {
      iframeRef.current.srcdoc = fullContent;
    }
  };

  return (
    <div className="h-full bg-white rounded overflow-hidden">
      <div className="bg-gray-200 p-2 flex items-center">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <div className="flex-grow bg-white rounded px-2 py-1 text-sm">Preview</div>
      </div>
      <iframe
        ref={iframeRef}
        title="Preview"
        sandbox="allow-scripts"
        className="w-full h-full border-none"
      />
    </div>
  );
};

export default BrowserPreview;
