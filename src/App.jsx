import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './index.css';
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
  const [inindex,setinindex]=useState()
  const [addChildeNode, setAddChildeNode] = useState(false);
  const [nodename,setnodename]=useState("")
  const [parentNode, setParentNode] = useState(null);
  const [tempdata, settempdata] = useState(" ");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodeType);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdge);
  const [uniquenode, setuniquenode] = useState([])
  const [inputtype, setInputtype] = useState([])
  const [inputFields, setInputFields] = useState([false])
  const onConnect = useCallback(() => setEdges((eds) => addEdge(eds)), [setEdges]);
  function fun(val) {
    let temp=JSON.stringify(val)
  console.log(val.id)
  // let inindex;
nodes.map((item,index)=>
{
  if(item.id===val.id)
  {

  setinindex(index)
  }
})

// console.log(inindex,nodes[inindex].data.label,"index")
  }

  useEffect(() => {
    //console.log(nodes)
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
      // console.log(uniquenode)
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
    // console.log(nodename,"name")
  }, [nodes, edges,nodename])
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
    //console.log(data)
    setnodename(" ")
    setInputFields(" ")
    fun(data)
    setuniquenode([...uniquenode,data])
    setInputFields([...inputFields,data])
    setInputFields(true)
    console.log(data)
    // alert("ok")
    // console.log(uniquenode)
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
    // setParentNode(uniquenode);
    setParentNode(inputFields);
  }
const submitHandler = e => {
  // e.preventDefault();
  // console.log(nodename,"name")
  console.log(nodename)
  alert("okk")  
}
  return ( 
    <div   onSubmit={submitHandler} style={{ width: '100', height: '100vh' }}>
      <div className='row' style={{ width: '100', height: '100vh', display:'flex' }}>
        <div style={{ width: '70%', height: '100vh', background: "#fc2c77" }}>
    
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
            {/* <input className="e-s"  type="submit" name=" submit" />  */}
             <button input className="e-s"  type="submit" name=" submit" onclick="submitHandler()">submit</button> 
          </ReactFlow>
        </div>
        <div  style={{ width: '30%', height: '100vh' }}>
          <ReactFlow
            //  nodes={uniquenode}
          >   
             </ReactFlow>
         
        </div>
        <div>
            {
              inputFields===true? <>  <input className="e-input" type="text"  value={nodename}  onChange={(e)=>
              {
                setnodename(e.target.value) 
                nodes[inindex].data.label=e.target.value
                setNodes(nodes)
              }} 
              key={inindex} placeholder="Enter message" /> </> : " "    
             }
          </div>    
        </div>
    </div> 
  );
}
export default App;

