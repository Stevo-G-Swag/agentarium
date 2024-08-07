import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DraggableComponent = ({ id, type, onDrop }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { id, type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {type}
    </div>
  );
};

const DropZone = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'component',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} style={{ minHeight: '100px', border: '1px dashed gray', backgroundColor: isOver ? 'lightblue' : 'white' }}>
      Drop components here
    </div>
  );
};

const VisualProgramming = ({ onUpdate }) => {
  const [structure, setStructure] = useState([]);

  const handleDrop = (item) => {
    setStructure([...structure, item]);
    onUpdate([...structure, item]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        <div className="w-1/4 p-4">
          <h3 className="mb-4">Components</h3>
          <DraggableComponent id="1" type="Button" />
          <DraggableComponent id="2" type="Input" />
          <DraggableComponent id="3" type="Form" />
        </div>
        <div className="w-3/4 p-4">
          <h3 className="mb-4">Canvas</h3>
          <DropZone onDrop={handleDrop} />
          <div className="mt-4">
            <h4>Structure:</h4>
            <pre>{JSON.stringify(structure, null, 2)}</pre>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default VisualProgramming;
