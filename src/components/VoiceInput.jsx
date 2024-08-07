import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

const VoiceInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const newRecognition = new window.webkitSpeechRecognition();
      newRecognition.continuous = true;
      newRecognition.interimResults = true;

      newRecognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        onTranscript(transcript);
      };

      newRecognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      setRecognition(newRecognition);
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    } else {
      console.error('Speech recognition is not supported in this browser.');
    }
  };

  return (
    <div>
      <Button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </Button>
      <p className="mt-4">Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceInput;
