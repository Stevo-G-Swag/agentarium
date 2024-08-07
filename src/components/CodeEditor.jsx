import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ESLint } from 'eslint';

const CodeEditor = ({ codebase, onCodeChange }) => {
  const [selectedFile, setSelectedFile] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (codebase && Object.keys(codebase).length > 0) {
      setSelectedFile(Object.keys(codebase)[0]);
    }
  }, [codebase]);

  useEffect(() => {
    if (selectedFile) {
      validateCode(codebase[selectedFile]);
    }
  }, [selectedFile, codebase]);

  const validateCode = async (code) => {
    const eslint = new ESLint();
    const results = await eslint.lintText(code);
    setErrors(results[0]?.messages || []);
  };

  const handleCodeChange = (newCode) => {
    onCodeChange(selectedFile, newCode);
  };

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
        <SyntaxHighlighter
          language="javascript"
          style={vscDarkPlus}
          customStyle={{ background: 'transparent' }}
          wrapLines={true}
          lineProps={lineNumber => {
            const error = errors.find(e => e.line === lineNumber);
            return {
              style: { display: 'block' },
              className: error ? 'error-line' : undefined,
            };
          }}
        >
          {codebase[selectedFile] || 'No file selected'}
        </SyntaxHighlighter>
      </ScrollArea>
      {errors.length > 0 && (
        <div className="mt-4 p-4 bg-red-500/10 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Errors:</h3>
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index} className="text-sm">
                Line {error.line}: {error.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default CodeEditor;
