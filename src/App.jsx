import { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 100, y: 5 }, data: { label: 'INTER' } },
  { id: '2', position: { x: 200, y: 50 }, data: { label: 'mpc' } },
  { id: '3', position: { x: 200, y: 50 }, data: { label: 'Bipc' } },
  { id: '4', position: { x: 100, y: 50 }, data: { label: 'cec' } },
  { id: '5', position: { x: 200, y: 50 }, data: { label: 'maths' } },
  { id: '6', position: { x: 200, y: 50 }, data: { label: "botany" } }
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' },
{ id: 'e1-3', source: '1', target: '3' },{ id: 'e1-4', source: '1', target: '4' },
{ id: 'e2-5', source: '2', target: '5' },{ id: 'e3-6', source: '3', target: '6' }
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback( ()=> setEdges((eds) => addEdge(eds)), [setEdges]);

  return (
    <div style={{width:'100',height:'100vh'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
     onConnect={onConnect}
    >
          <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
    </div>
  );
}
export default App