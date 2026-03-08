import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Position,
  Handle,
  NodeProps,
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/* ── Color palette for node accents ── */
const ACCENT_COLORS: Record<string, { bg: string; dot: string; border: string; darkBg: string; darkBorder: string }> = {
  purple: { bg: '#F5F3FF', dot: '#8B5CF6', border: '#E9E5FF', darkBg: '#1E1533', darkBorder: '#3B2D5C' },
  blue:   { bg: '#EFF6FF', dot: '#3B82F6', border: '#DBEAFE', darkBg: '#141E33', darkBorder: '#1E3A5F' },
  green:  { bg: '#F0FDF4', dot: '#10B981', border: '#D1FAE5', darkBg: '#0F2318', darkBorder: '#1A3D2A' },
  amber:  { bg: '#FFFBEB', dot: '#F59E0B', border: '#FEF3C7', darkBg: '#231D0F', darkBorder: '#3D3018' },
  rose:   { bg: '#FFF1F2', dot: '#EC4899', border: '#FFE4E6', darkBg: '#23101A', darkBorder: '#3D1A2E' },
  cyan:   { bg: '#ECFEFF', dot: '#06B6D4', border: '#CFFAFE', darkBg: '#0F2126', darkBorder: '#173B42' },
  slate:  { bg: '#F8FAFC', dot: '#64748B', border: '#E2E8F0', darkBg: '#171B21', darkBorder: '#2A3040' },
  indigo: { bg: '#EEF2FF', dot: '#6366F1', border: '#E0E7FF', darkBg: '#171833', darkBorder: '#282A5C' },
};

/* ── Custom Node Component ── */
function FlowCard({ data, selected }: NodeProps) {
  const accent = ACCENT_COLORS[data.accent as string] || ACCENT_COLORS.purple;
  const isDark = data.isDark as boolean;

  const bgColor = isDark ? accent.darkBg : accent.bg;
  const borderColor = isDark ? accent.darkBorder : accent.border;
  const titleColor = isDark ? '#F1F5F9' : '#1E293B';
  const contentColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <div
      className="rounded-xl px-5 py-4 transition-shadow duration-200"
      style={{
        backgroundColor: bgColor,
        border: `1.5px solid ${borderColor}`,
        width: data.nodeWidth as number || 260,
        boxShadow: selected
          ? `0 0 0 2px ${accent.dot}40`
          : isDark
            ? '0 4px 20px -4px rgba(0,0,0,0.5)'
            : '0 4px 20px -4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Handles on all 4 sides */}
      <Handle type="target" position={Position.Left} className="!w-0 !h-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Right} className="!w-0 !h-0 !border-0 !bg-transparent" />
      <Handle type="target" position={Position.Top} id="top" className="!w-0 !h-0 !border-0 !bg-transparent" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!w-0 !h-0 !border-0 !bg-transparent" />

      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: accent.dot }} />
        <h3
          className="text-[13px] font-bold leading-tight"
          style={{ color: titleColor, fontFamily: "'Inter', sans-serif" }}
        >
          {data.title as string}
        </h3>
      </div>
      <p
        className="text-[12px] leading-[1.6]"
        style={{ color: contentColor, fontFamily: "'Inter', sans-serif" }}
      >
        {data.content as string}
      </p>
    </div>
  );
}

/* ── Custom Curved Edge with label ── */
function LabeledEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
}: EdgeProps) {
  const isDark = data?.isDark as boolean;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    curvature: 0.4,
  });

  const label = data?.label as string | undefined;
  const edgeColor = isDark ? '#334155' : '#CBD5E1';
  const labelBg = isDark ? '#1E293B' : '#F8FAFC';
  const labelBorder = isDark ? '#334155' : '#E2E8F0';
  const labelText = isDark ? '#94A3B8' : '#64748B';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          ...style,
          stroke: edgeColor,
          strokeWidth: 1.5,
          strokeDasharray: '6 4',
        }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
              backgroundColor: labelBg,
              border: `1px solid ${labelBorder}`,
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 10,
              color: labelText,
              fontFamily: "'Inter', sans-serif",
              whiteSpace: 'nowrap',
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

const nodeTypes = { flowCard: FlowCard };
const edgeTypes = { labeled: LabeledEdge };

/* ── Main Component ── */
interface NautilusFlowchartProps {
  isDark: boolean;
}

const NautilusFlowchart = ({ isDark }: NautilusFlowchartProps) => {
  const gapX = 340;
  const gapY = 200;

  const initialNodes: Node[] = useMemo(() => [
    // Row 1 — Features
    {
      id: 'ai-gen',
      type: 'flowCard',
      position: { x: 0, y: 0 },
      data: { title: 'AI-Generated Cards', content: 'Topic cards, concept cards, and flowcharts generated from a simple prompt using AI models.', accent: 'purple', isDark, nodeWidth: 280 },
      draggable: false,
    },
    {
      id: 'canvas',
      type: 'flowCard',
      position: { x: gapX, y: 0 },
      data: { title: 'Infinite Canvas', content: 'Pan, zoom, and freehand drawing on an infinite zoomable canvas with smooth interactions.', accent: 'blue', isDark, nodeWidth: 280 },
      draggable: false,
    },
    {
      id: 'nodes',
      type: 'flowCard',
      position: { x: gapX * 2, y: 0 },
      data: { title: 'Multiple Node Types', content: 'Content cards, topic nodes, and flowchart shapes with full markdown rendering.', accent: 'green', isDark, nodeWidth: 280 },
      draggable: false,
    },

    // Row 2 — Features continued
    {
      id: 'edges',
      type: 'flowCard',
      position: { x: 0, y: gapY },
      data: { title: 'Smart Labeled Edges', content: 'Automatic layout with labeled connections between nodes using Dagre graph algorithm.', accent: 'amber', isDark, nodeWidth: 280 },
      draggable: false,
    },
    {
      id: 'save',
      type: 'flowCard',
      position: { x: gapX, y: gapY },
      data: { title: 'Auto-save & Undo/Redo', content: 'Session management with persistent auto-save, full undo/redo history, and recovery.', accent: 'rose', isDark, nodeWidth: 280 },
      draggable: false,
    },
    {
      id: 'explain',
      type: 'flowCard',
      position: { x: gapX * 2, y: gapY },
      data: { title: 'AI Chain Explanations', content: 'Select connected nodes and get AI-generated explanations for the concept chain.', accent: 'cyan', isDark, nodeWidth: 280 },
      draggable: false,
    },

    // Row 3 — Tech Stack
    {
      id: 'frontend',
      type: 'flowCard',
      position: { x: 0, y: gapY * 2 },
      data: { title: 'Frontend', content: 'React • TypeScript • Vite • Tailwind CSS • shadcn/ui', accent: 'slate', isDark, nodeWidth: 280 },
      draggable: false,
    },
    {
      id: 'canvas-lib',
      type: 'flowCard',
      position: { x: gapX, y: gapY * 2 },
      data: { title: 'Canvas & Layout', content: 'React Flow (@xyflow/react) • Dagre • Framer Motion', accent: 'indigo', isDark, nodeWidth: 280 },
      draggable: false,
    },
    {
      id: 'backend',
      type: 'flowCard',
      position: { x: gapX * 2, y: gapY * 2 },
      data: { title: 'Backend & Data', content: 'Supabase Edge Functions (Deno) • Supabase PostgreSQL • React Query', accent: 'green', isDark, nodeWidth: 280 },
      draggable: false,
    },
  ], [isDark, gapX, gapY]);

  const initialEdges: Edge[] = useMemo(() => [
    // Feature connections (horizontal + diagonal)
    { id: 'e1', source: 'ai-gen', target: 'canvas', type: 'labeled', data: { label: 'renders on', isDark }, animated: false },
    { id: 'e2', source: 'canvas', target: 'nodes', type: 'labeled', data: { label: 'displays', isDark }, animated: false },
    { id: 'e3', source: 'ai-gen', target: 'edges', type: 'labeled', sourceHandle: 'bottom', targetHandle: 'top', data: { label: 'creates', isDark }, animated: false },
    { id: 'e4', source: 'nodes', target: 'explain', type: 'labeled', sourceHandle: 'bottom', targetHandle: 'top', data: { label: 'analyzed by', isDark }, animated: false },
    { id: 'e5', source: 'edges', target: 'save', type: 'labeled', data: { label: 'persisted by', isDark }, animated: false },
    { id: 'e6', source: 'save', target: 'explain', type: 'labeled', data: { label: 'powers', isDark }, animated: false },

    // Tech stack connections (vertical)
    { id: 'e7', source: 'edges', target: 'frontend', type: 'labeled', sourceHandle: 'bottom', targetHandle: 'top', data: { label: 'built with', isDark }, animated: false },
    { id: 'e8', source: 'save', target: 'canvas-lib', type: 'labeled', sourceHandle: 'bottom', targetHandle: 'top', data: { label: 'powered by', isDark }, animated: false },
    { id: 'e9', source: 'explain', target: 'backend', type: 'labeled', sourceHandle: 'bottom', targetHandle: 'top', data: { label: 'served by', isDark }, animated: false },

    // Tech cross-connections
    { id: 'e10', source: 'frontend', target: 'canvas-lib', type: 'labeled', data: { label: 'integrates', isDark }, animated: false },
    { id: 'e11', source: 'canvas-lib', target: 'backend', type: 'labeled', data: { label: 'connects to', isDark }, animated: false },
  ], [isDark]);

  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  const bgColor = isDark ? '#0A0A0A' : '#FAFAFA';
  const dotColor = isDark ? '#1E293B' : '#E2E8F0';

  // Calculate canvas height based on 3 rows
  const canvasHeight = gapY * 2 + 180 + 80; // rows + card height + padding

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        height: canvasHeight,
        border: `1px solid ${isDark ? '#1E293B' : '#E2E8F0'}`,
        backgroundColor: bgColor,
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={1}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} color={dotColor} />
      </ReactFlow>
    </div>
  );
};

export default NautilusFlowchart;
