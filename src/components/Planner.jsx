import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";

const Planner = () => {
  const tasks = [
    { id: 1, title: 'Set up project structure', status: 'completed' },
    { id: 2, title: 'Create main components', status: 'in-progress' },
    { id: 3, title: 'Implement API integration', status: 'pending' },
  ];

  return (
    <ScrollArea className="h-full p-4 bg-gray-800 rounded">
      <h2 className="text-xl font-bold mb-4">Project Plan</h2>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${
              task.status === 'completed' ? 'bg-green-500' :
              task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-red-500'
            }`}></span>
            <span>{task.title}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  );
};

export default Planner;
