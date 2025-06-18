import { FiTrendingUp } from "react-icons/fi";

const StatsCard = ({ icon: Icon, title, value, change, color }) => (
  <div className="bg-base-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-base-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p
          className={`text-sm flex items-center mt-2 ${
            change >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          <FiTrendingUp className="w-4 h-4 mr-1" />
          {change >= 0 ? "+" : ""}
          {change}% from last month
        </p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

export default StatsCard;
