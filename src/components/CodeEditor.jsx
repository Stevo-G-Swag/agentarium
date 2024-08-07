import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CodeEditor = ({ codebase }) => {
  const [selectedFile, setSelectedFile] = useState(Object.keys(codebase)[0] || '');

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
        <pre className="text-sm text-white">{codebase[selectedFile] || 'No file selected'}</pre>
      </ScrollArea>
    </div>
  );
};

export default CodeEditor;
