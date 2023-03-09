import React, { useCallback, useEffect, useState ,useRef} from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
const initialNodeType = [
  { id: '1', position: { x: 500, y: 200 }, data: { label: 'NODE1' } },
  { id: '2', position: { x: 500, y: 350 }, data: { label: 'NODE2' } },
];
const initialEdge = [{ id: 'e1-2', source: '1', target: '2', label: '+' }
];
let id = 2;
const getId = () => `${++id}`;
function App() {
  const [addnode, setAddnode] = useState(false);
  const [addChildeNode, setAddChildeNode] = useState(false);
  const [parentNode, setParentNode] = useState(null);
  const [tempdata, settempdata] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodeType);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge);
  const [margin,setMargin] = useState(false);
  const onConnect = useCallback(() => setEdges((eds) => addEdge(eds)), [setEdges]);
  let nodeRef = useRef();
  useEffect(() => {
    let handler=(e)=>{
      if(!nodeRef.current.contains(e.target)){
        setMargin(false);
        console.log(nodeRef.current);
      }
    }
    if (addnode) {
      const findFirstNode = nodes.find(item => item.id === initialEdge.target);
      console.log("tempdata", tempdata)
      console.log("nodes", nodes)
      console.log("edges", edges)
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000) * 1000000)),
        source: tempdata.source,
        target: nodes[nodes.length - 1].id,
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
      }));
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000) * 1000000)),
        source: nodes[nodes.length - 1].id,
        target: tempdata.target,
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
      }));
      var index = edges.findIndex(x => x.id === tempdata.id);
      edges.splice(index, 1)
      setAddnode(false);
      setParentNode(null);
    }
    if (addChildeNode) {
      setEdges((eds) => eds.concat({
        id: String(parseInt(Math.random(100000000) * 1000000)),
        source: parentNode.id,
        target: nodes[nodes.length - 1].id,
        label: '+',
        labelBgPadding: [8, 4],
        labelBgBorderRadius: 4,
        labelBgStyle: { fill: '#FFCC00', color: '#fff', fillOpacity: 0.7 },
      }));
      setAddChildeNode(false);
      setParentNode(null);
    }
  }, [nodes, edges])
  const handleEdgeClick = (e, data) => {
    settempdata(data)
    const findSourceNode = nodes.find((item) => item.id === data.source);
    setNodes((nds) => nds.concat({
      id: getId(),
      position: { x: findSourceNode.position.x, y: findSourceNode.position.y + 70 },
      data: { label: `Node ${id}`, parentId: data.target, ...initialNodeType.data },
    }));
    setParentNode(findSourceNode);
    setAddnode(true);
  }
  const handleNodeClick = (e, data) => {
    setMargin(data)
    // const filterNodeswithSameSource = nodes.filter((node) => node?.data?.parentId === data?.id);//2
    // console.log(data)
    // console.log(nodes)
    // setNodes((nds) => nds.concat({

    //   id: getId(),
    //   position: { x: data.position.x + filterNodeswithSameSource != undefined ? filterNodeswithSameSource.length * 150 : 0, y: data.position.y + 70 },
    //   data: { label: `Node ${id}`, parentId: data.id },
    //   width: 150,
    // }));
    setAddChildeNode(true)
    setParentNode(data);
  }
  return (
    <div style={{ width: '100', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onEdgeClick={handleEdgeClick}
        onNodeClick={handleNodeClick}
      >

     
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <div class="vl"></div>
    </div>
  );
}
export default App