import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from 'framer-motion';

const TerminalComponent = () => {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();
    setOutput([...output, `$ ${input}`, 'Command not recognized']);
    setInput('');
  };

  return (
    <motion.div 
      className="h-full flex flex-col bg-black/30 rounded-lg backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollArea className="flex-grow text-green-400 font-mono text-sm mb-4">
        {output.map((line, index) => (
          <motion.div 
            key={index} 
            className="break-words"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {line}
          </motion.div>
        ))}
      </ScrollArea>
      <form onSubmit={handleCommand} className="flex">
        <span className="text-green-400 mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-transparent text-green-400 outline-none"
        />
      </form>
    </motion.div>
  );
};

export default TerminalComponent;
