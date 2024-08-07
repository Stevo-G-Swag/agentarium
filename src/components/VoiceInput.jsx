import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

const VoiceInput = ({ onTranscript }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let recognition = null;

    if ('webkitSpeechRecognition' in window) {
      recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
        onTranscript(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [onTranscript]);

  const toggleListening = () => {
    if (isListening) {
      window.webkitSpeechRecognition.stop();
    } else {
      window.webkitSpeechRecognition.start();
    }
    setIsListening(!isListening);
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
