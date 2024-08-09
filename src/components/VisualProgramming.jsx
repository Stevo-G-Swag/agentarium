import React, { useState } from 'react';
import ReactFlow, { Handle, Position } from 'react-flow-renderer';

const initialElements = [
  {
    id: '1',
    type: 'input',
     { label: 'Input Node' },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    type: 'output',
     { label: 'Output Node' },
    position: { x: 300, y: 100 },
  },
];

const VisualProgramming = () => {
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => setElements((els) => ReactFlow.addEdge(params, els));

  return (
    <div style={{ height: 500 }}>
      <ReactFlow
        elements={elements}
        onConnect={onConnect}
        nodeTypes={{
          input: CustomInputNode,
          output: CustomOutputNode,
        }}
      />
    </div>
  );
};

const CustomInputNode = ({ data }) => {
  return (
    <div className="bg-blue-500 text-white p-2 rounded">
      <Handle type="source" position={Position.Right} id="a" />
      {data.label}
    </div>
  );
};

const CustomOutputNode = ({ data }) => {
  return (
    <div className="bg-green-500 text-white p-2 rounded">
      <Handle type="target" position={Position.Left} id="b" />
      {data.label}
    </div>
  );
};

export default VisualProgramming;
