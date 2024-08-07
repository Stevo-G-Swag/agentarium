const ResultDisplay = ({ result }) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">Result:</h3>
      <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
        {result}
      </pre>
    </div>
  );
};

export default ResultDisplay;
