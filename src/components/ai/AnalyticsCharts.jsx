import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

export function CategoryPieChart({ data = [] }) {
  const COLORS = ['#B76E79', '#E89DA2', '#D4A373', '#8E9AAF'];

  const hasData = data.some(d => d.value > 0);
  if (!hasData) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
        No category browsing telemetry recorded yet.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} interactions`, name]}
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function InteractionBarChart({ data = [] }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#4B5563' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}
          />
          <Bar dataKey="count" fill="#B76E79" radius={[6, 6, 0, 0]} barSize={34} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ConcernBarChart({ data = [] }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
          <YAxis dataKey="concern" type="category" tick={{ fontSize: 11, fill: '#374151' }} width={80} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}
          />
          <Bar dataKey="interactions" fill="#D4A373" radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BudgetBarChart({ data = [] }) {
  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="bracket" tick={{ fontSize: 11, fill: '#4B5563' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}
          />
          <Bar dataKey="count" fill="#E89DA2" radius={[6, 6, 0, 0]} barSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ActivityTimelineChart({ data = [] }) {
  if (!data.length) {
    return (
      <div style={{ padding: '40px 20px', textAlign: 'center', color: '#9CA3AF', fontSize: '0.9rem' }}>
        No browsing timeline data available yet.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 260 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorActions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#B76E79" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#B76E79" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#4B5563' }} />
          <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.85rem' }}
          />
          <Area type="monotone" dataKey="actions" stroke="#B76E79" strokeWidth={2} fillOpacity={1} fill="url(#colorActions)" />
          <Line type="monotone" dataKey="intent" stroke="#D4A373" strokeWidth={2} dot={{ r: 3 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
