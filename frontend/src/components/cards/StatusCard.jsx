const StatsCard = ({ name, value }) => (
  <div className="bg-base-100 rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-base-300">
    <div className="flex items-center justify-between capitalize text-base">
      <p className="font-bold">{name}</p>

      <p className="font-bold">{value}</p>
    </div>
  </div>
);

export default StatsCard;
