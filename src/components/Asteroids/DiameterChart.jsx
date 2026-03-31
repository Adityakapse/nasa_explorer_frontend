import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DiameterChart = ({ data }) => (
  <div className="bg-gray-800 rounded-2xl p-6">
    <h2 className="text-lg font-semibold mb-4">Estimated Diameter — Top 10 (km)</h2>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 10 }} angle={-20} textAnchor="end" height={50} />
        <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} />
        <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
        <Bar dataKey="diameter" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Diameter (km)" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default DiameterChart;
