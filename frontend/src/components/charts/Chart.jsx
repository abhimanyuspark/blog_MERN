import { Doughnut } from "react-chartjs-2";

function Chart({ data = {} }) {
  return (
    <div className="flex items-center justify-center">
      <div style={{ width: 350, height: 350 }}>
        <Doughnut
          data={{
            ...data,
            datasets: data?.datasets?.map((ds) => ({
              ...ds,
              cutout: "65%",
            })),
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "right",
                align: "center",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default Chart;
