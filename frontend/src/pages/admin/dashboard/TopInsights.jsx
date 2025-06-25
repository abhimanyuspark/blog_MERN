import { Chart } from "../../../components";

const TopInsights = ({ tagUsage }) => {
  const processedData = (() => {
    if (!tagUsage) return [];

    const sorted = [...tagUsage]?.sort((a, b) => b?.count - a?.count);
    const topFour = sorted.slice(0, 4);
    const others = sorted.slice(4);

    const othersCount = others.reduce((sum, item) => sum + item.count, 0);
    const finalData = topFour.map((item) => ({
      ...item,
      name: item.tag || "",
    }));

    if (othersCount > 0) {
      finalData.push({
        name: "Others",
        count: othersCount,
      });
    }

    return finalData;
  })();

  return (
    <div className="bg-base-100 border border-base-300 p-4 rounded-lg">
      <h3 className="font-semibold">Top Insights</h3>
      <Chart
        data={{
          labels: processedData.map((item) => item.name),
          datasets: [
            {
              data: processedData.map((item) => item.count),
              backgroundColor: [
                "rgba(255, 99, 132, 0.9)",
                "rgba(54, 162, 235, 0.9)",
                "rgba(255, 206, 86, 0.9)",
                "rgba(75, 192, 192, 0.9)",
                "rgba(153, 102, 255, 0.9)",
                "rgba(255, 159, 64, 0.9)",
              ],
              borderWidth: 0,
            },
          ],
        }}
      />

      <ul className="flex items-center gap-2 w-full justify-center">
        {processedData.map((item, i) => (
          <li key={i} className="badge badge-accent text-accent-content">
            # {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopInsights;
