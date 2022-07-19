// @ts-nocheck
import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MarkerType,
  updateEdge,
  useEdgesState,
  useNodesState
} from "react-flow-renderer";
import { Node } from "../node";
import { EndNode } from "../node/step/end";
import { StartNode } from "../node/step/start";
import { StepGroupNode } from "../block/stepgroup";
import { CommandNode } from "../node/step/command";
import uuid from "react-uuid";

const nodeSource = [
  {
    id: "start",
    type: "start",
    data: { label: "Input Node" },
    position: { x: 0, y: 0 }
  },
  {
    id: "end",
    type: "end",
    data: { label: "Input Node" },
    position: { x: 250, y: 0 }
  }
];
const nodeTypes = { command: CommandNode, start: StartNode, end: EndNode };

const edgeSource = [
  {
    id: "start::end",
    source: "start",
    target: "end",
    animated: true,
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "indigo"
    },
    style: {
      stroke: "indigo"
    }
  }
];

export function StudioContent() {
  const [nodes, setNodes, onNodesChange] = useNodesState(nodeSource);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgeSource);
  const onEdgeUpdate = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onAdd = (event, node) => {
    const nodeId = node.id;
    const newNodeId = uuid();
    const newNode = {
      id: newNodeId,
      type: "command",
      data: { label: "Added node" },
      position: {
        x: node.position.x + 150,
        y: 0
      }
    };
    const cloneNode = nodes.map((item) => {
      if (item.position.x > node.position.x)
        item.position.x = item.position.x + 150;
      return item;
    });
    setNodes([...cloneNode, newNode]);
    // setNodes((el) => el.concat(newNode));
    edges
      .filter((x) => x.source === nodeId)
      .map((item) => {
        item.id = `${newNodeId}::${item.target}`;
        item.source = newNodeId;
      });
    const newEdge = {
      id: `${nodeId}::${newNodeId}`,
      source: nodeId,
      target: newNodeId,
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "indigo"
      },
      style: {
        stroke: "indigo"
      }
    };
    setEdges([...edges, newEdge]);
  };

  return (
    <div className="flex">
      <div>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeUpdate={onEdgeUpdate}
          nodeTypes={nodeTypes}
          fitView
          style={{ backgroundColor: "#B8CEFF", position: "absolute" }}
          onNodeClick={(e, node) => onAdd(e, node)}
          // onEdgeClick={(e, node) => console.log(e, node, "onEdgeClick")}
        >
          {/* <MiniMap
          // nodeStrokeColor={(n) => {
          //   if (n.style?.background) return n.style.background;
          //   if (n.type === "input") return "#0041d0";
          //   if (n.type === "output") return "#ff0072";
          //   if (n.type === "default") return "#1a192b";

          //   return "#eee";
          // }}
          // nodeColor={(n) => {
          //   if (n.style?.background) return n.style.background;

          //   return "#fff";
          // }}
          nodeBorderRadius={2}
        /> */}
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
}
