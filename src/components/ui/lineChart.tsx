// import line chart from react-chartjs
// import categoryscale from react-chartjs-2
import { Chart, registerables } from 'chart.js';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useOrder } from '../../context/OrderContext';

Chart.register(...registerables);

function LineChart() {
  const { orders } = useOrder();
  const [loading, setLoading] = useState(true);

  const ordersArr = useMemo(() => {
    const arr = orders.map((order) => {
      const date = new Date(order.date);
      const month = date.getMonth() + 1;
      return {
        month,
        total: order.total,
      };
    });
    return arr;
  }, [orders]);

  const salesByMonth = useMemo(() => {
    const sale = ordersArr.reduce((acc: any, cur: any) => {
      const month = cur.month;
      const total = cur.total;
      const exists = acc.find((item: any) => item.month === month);
      if (exists) {
        exists.total += total;
      } else {
        acc.push({
          month,
          total,
        });
      }
      return acc;
    }, []);
    sale.sort((a: any, b: any) => a.month - b.month);
    if (sale.length < 6) {
      while (sale.length < 6) {
        sale.unshift({
          month: sale[0].month - 1,
          total: 0,
        });
      }
    }
    setLoading(false);
    return sale;
  }, [ordersArr]);

  const numberToMonthName = (month: number) => {
    const date = new Date(2022, month, 1);
    return format(date, 'MMM');
  };

  return (
    <Line
      data={{
        labels: loading
          ? ['jan', 'feb', 'mar', 'apr', 'may', 'jun']
          : [salesByMonth.map((item: any) => numberToMonthName(item.month))],
        datasets: [
          {
            label: 'Sales',
            data: loading
              ? [0, 0, 0, 0, 0, 0]
              : salesByMonth.map(
                  (item: { month: number; total: number }) => item.total
                ),
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
  );
}
export default LineChart;
