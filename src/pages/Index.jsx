import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import TriagingAgent from '../agents/TriagingAgent';

const triagingAgent = new TriagingAgent();

const Index = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Enter your query here..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mb-4"
            />
            <Button type="submit">Submit Query</Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <h3 className="text-lg font-semibold mb-2">Result:</h3>
            <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
              {result}
            </pre>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
