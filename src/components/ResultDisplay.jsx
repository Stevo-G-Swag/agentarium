import { ScrollArea } from "@/components/ui/scroll-area"

const ResultDisplay = ({ result }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">Result:</h3>
      <ScrollArea className="h-[300px] w-full rounded-md border p-4">
        <pre className="text-sm">
          {result}
        </pre>
      </ScrollArea>
    </div>
  );
};

export default ResultDisplay;
