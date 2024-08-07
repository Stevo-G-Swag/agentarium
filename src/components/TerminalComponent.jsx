import React, { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const TerminalComponent = () => {
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState('');

  const handleCommand = (e) => {
    e.preventDefault();
    setOutput([...output, `$ ${input}`, 'Command not recognized']);
    setInput('');
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-grow p-4 bg-black text-green-500 font-mono text-sm">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </ScrollArea>
      <form onSubmit={handleCommand} className="mt-2 flex">
        <span className="text-green-500 mr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow bg-black text-green-500 outline-none"
        />
      </form>
    </div>
  );
};

export default TerminalComponent;
