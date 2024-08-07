import React from 'react';
import { motion } from 'framer-motion';
import CodeEditor from './CodeEditor';
import TerminalComponent from './TerminalComponent';
import Planner from './Planner';
import BrowserPreview from './BrowserPreview';
import VoiceInput from './VoiceInput';

const Workspace = ({ activeComponent, codebase, onFeedback }) => {
  const componentMap = {
    codeEditor: <CodeEditor codebase={codebase} onFeedback={onFeedback} />,
    terminal: <TerminalComponent />,
    planner: <Planner />,
    browser: <BrowserPreview codebase={codebase || {}} />,
    voiceInput: <VoiceInput onTranscript={onFeedback} />,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-[500px] overflow-auto"
    >
      {componentMap[activeComponent]}
    </motion.div>
  );
};

export default Workspace;
