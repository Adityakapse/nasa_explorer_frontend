import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MissDistanceChart = ({ data }) => (
  <div className="bg-gray-800 rounded-2xl p-6">
    <h2 className="text-lg font-semibold mb-4">Miss Distance — Top 10 (million km)</h2>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis type="number" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
        <YAxis type="category" dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 10 }} width={80} />
        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
        <Bar dataKey="distance" fill="#F59E0B" radius={[0, 4, 4, 0]} name="Distance (M km)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default MissDistanceChart;
