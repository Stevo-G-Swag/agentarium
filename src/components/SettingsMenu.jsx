import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsMenu = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch('https://api.openai.com/v1/models', {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        });
        const data = await response.json();
        setModels(data.data);
      } catch (error) {
        console.error('Error fetching models:', error);
      }
    };

    if (apiKey) {
      fetchModels();
    }
  }, [apiKey]);

  const handleSave = () => {
    onSave({ apiKey, endpoint, model: selectedModel });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="api-key">API Key</Label>
        <Input id="api-key" type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="endpoint">Endpoint</Label>
        <Input id="endpoint" type="text" value={endpoint} onChange={(e) => setEndpoint(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="model">Model</Label>
        <Select onValueChange={setSelectedModel} value={selectedModel}>
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>{model.id}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  );
};

export default SettingsMenu;
