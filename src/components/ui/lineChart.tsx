// import line chart from react-chartjs
// import categoryscale from react-chartjs-2
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(...registerables);

const LineChart = () => {
  return (
    <>
      <Line
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Sales",
              data: [3, 2, 2, 1, 5, 3, 4],
              fill: false,
            },
          ],
        }}
        // height={}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </>
  );
};
export default LineChart;
