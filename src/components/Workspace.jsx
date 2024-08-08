import React from 'react';
import { motion } from 'framer-motion';
import CodeEditor from './CodeEditor';
import TerminalComponent from './TerminalComponent';
import Planner from './Planner';
import BrowserPreview from './BrowserPreview';
import VoiceInput from './VoiceInput';

const Workspace = ({ activeComponent, codebase, onFeedback }) => {
  const renderComponent = () => {
    switch (activeComponent) {
      case 'codeEditor':
        return <CodeEditor codebase={codebase} onFeedback={onFeedback} />;
      case 'terminal':
        return <TerminalComponent />;
      case 'planner':
        return <Planner />;
      case 'browser':
        return <BrowserPreview codebase={codebase || {}} />;
      case 'voiceInput':
        return <VoiceInput onTranscript={onFeedback} />;
      default:
        return <div>No component selected</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-[500px] overflow-auto"
    >
      {renderComponent()}
    </motion.div>
  );
};

export default Workspace;
