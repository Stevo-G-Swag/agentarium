import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ArrowLeft, Code, Terminal, Layout, Globe, Mic } from "lucide-react"
import { toast } from "sonner"
import ErrorBoundary from '../components/ErrorBoundary';
import Workspace from '../components/Workspace';
import SettingsMenu from '../components/SettingsMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ErebusAgent } from '../agents/ErebusAgent'; // Import ErebusAgent
import sharedEnv from './environment'; // Import the shared environment

const Index = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [codebase, setCodebase] = useState({});
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [activeComponent, setActiveComponent] = useState('codeEditor');
  const [currentStatus, setCurrentStatus] = useState('');

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (name, description) => {
    setIsLoading(true);
    setError(null);
    setCurrentStatus(''); // Clear previous status

    try {
      // Initialize ErebusAgent with your API key and desired model
      const erebus = new ErebusAgent(sharedEnv.apiKey, 'gpt-3.5-turbo'); 

      // Start the app creation process
      const appData = await erebus.process(
        name,
        description,
        (step, message) => {
          console.log(`${step}: ${message}`);
          setCurrentStatus(message); // Update the status message
        },
        'User feedback here' // Replace with actual user feedback
      );

      setResult(`App "${name}" creation process completed.`);
      setCodebase(appData.codebase);
    } catch (err) {
      setError('Failed to create app. Please try again.');
      console.error('Error in handleSubmit:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
    toast.success('Settings saved successfully');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl font-bold">Loading CodeGenie AI...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
        <AnimatePresence mode="wait">
        {showSettings ? (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <SettingsMenu onSave={handleSaveSettings} />
          </motion.div>
        ) : (
          <motion.div
            key="workspace"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            <div className="max-w-7xl mx-auto">
              <h1 className