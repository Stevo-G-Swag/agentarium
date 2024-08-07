import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import TriagingAgent from '../agents/TriagingAgent';
import QueryForm from '../components/QueryForm';
import ResultDisplay from '../components/ResultDisplay';
import SettingsMenu from '../components/SettingsMenu';

const Index = () => {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [triagingAgent, setTriagingAgent] = useState(null);

  useEffect(() => {
    if (settings) {
      setTriagingAgent(new TriagingAgent(settings.apiKey, settings.model));
    }
  }, [settings]);

  const handleSubmit = async (query) => {
    if (!triagingAgent) {
      setError('Please configure the settings first.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const triageResult = await triagingAgent.process(query);
      setResult(triageResult);
    } catch (err) {
      setError('An error occurred while processing your query. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = (newSettings) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <CardTitle className="text-3xl font-bold">CodeGenie</CardTitle>
          <CardDescription className="text-white opacity-80">Enter your query to generate code</CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          {showSettings ? (
            <SettingsMenu onSave={handleSaveSettings} />
          ) : (
            <>
              <QueryForm onSubmit={handleSubmit} isLoading={isLoading} />
              {isLoading && (
                <div className="flex justify-center items-center mt-4">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
              )}
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          {result && <ResultDisplay result={result} />}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            {showSettings ? 'Back to Query' : 'Settings'}
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
