import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';

const CodeEditor = ({ codebase }) => {
  const [selectedFile, setSelectedFile] = useState('');

  useEffect(() => {
    if (codebase && Object.keys(codebase).length > 0) {
      setSelectedFile(Object.keys(codebase)[0]);
    }
  }, [codebase]);

  if (!codebase || Object.keys(codebase).length === 0) {
    return <div className="text-center text-gray-400">No code to display</div>;
  }

  return (
    <motion.div 
      className="h-full flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Select onValueChange={setSelectedFile} value={selectedFile}>
        <SelectTrigger className="w-full bg-white/10 border-white/20">
          <SelectValue placeholder="Select a file" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(codebase).map((filename) => (
            <SelectItem key={filename} value={filename}>{filename}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ScrollArea className="flex-grow mt-4 p-4 bg-black/30 rounded-lg backdrop-blur-sm">
        <pre className="text-sm text-green-400 font-mono whitespace-pre-wrap break-words">{codebase[selectedFile] || 'No file selected'}</pre>
      </ScrollArea>
    </motion.div>
  );
};

export default CodeEditor;
