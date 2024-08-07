import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CodeEditor = ({ codebase }) => {
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    if (codebase && Object.keys(codebase).length > 0) {
      setSelectedFile(Object.keys(codebase)[0]);
    }
  }, [codebase]);

  if (!codebase || Object.keys(codebase).length === 0) {
    return <div>No code to display</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <Select onValueChange={setSelectedFile} value={selectedFile}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a file" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(codebase).map((filename) => (
            <SelectItem key={filename} value={filename}>{filename}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ScrollArea className="flex-grow mt-4 p-4 bg-gray-800 rounded">
        <pre className="text-sm text-white whitespace-pre-wrap break-words">{codebase[selectedFile] || 'No file selected'}</pre>
      </ScrollArea>
    </div>
  );
};

export default CodeEditor;
