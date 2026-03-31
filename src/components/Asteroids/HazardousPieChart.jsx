import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const HazardousPieChart = ({ data }) => (
  <div className="bg-gray-800 rounded-2xl p-6">
    <h2 className="text-lg font-semibold mb-4">Hazardous vs Safe</h2>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          dataKey="value"
          label={({ name, value }) => `${name}: ${value}`}
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={i === 0 ? '#10B981' : '#EF4444'} />
          ))}
        </Pie>
        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default HazardousPieChart;
