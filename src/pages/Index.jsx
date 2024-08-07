import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TriagingAgent from '../agents/TriagingAgent';
import QueryForm from '../components/QueryForm';
import ResultDisplay from '../components/ResultDisplay';

const triagingAgent = new TriagingAgent();

const Index = () => {
  const [result, setResult] = useState('');

  const handleSubmit = async (query) => {
    const triageResult = triagingAgent.process(query);
    setResult(triageResult);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>CodeGenie</CardTitle>
          <CardDescription>Enter your query to generate code</CardDescription>
        </CardHeader>
        <CardContent>
          <QueryForm onSubmit={handleSubmit} />
        </CardContent>
        <CardFooter>
          <ResultDisplay result={result} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
