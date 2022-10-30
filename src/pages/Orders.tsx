import OrdersCard from "@/components/orders-cards";
import AddButton from "@/components/ui/add-btn";
import PageTitle from "@/components/ui/page-title";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const TableData = [
  {
    id: 12421,
    tableNumber: 1,
    date: "2021-10-01",
    time: "21:00",
    status: "Completed",
    total: "$300.00",
  },
  {
    id: 21425,
    tableNumber: 2,
    date: "2021-10-01",
    time: "20:00",
    status: "Active",
    total: "$200.00",
  },
  {
    id: 35253,
    tableNumber: 3,
    date: "2021-10-01",
    time: "21:05",
    status: "Completed",
    total: "$400.00",
  },
  {
    id: 42152,
    tableNumber: 1,
    date: "2021-10-01",
    time: "21:00",
    status: "Completed",
    total: "$300.00",
  },
  {
    id: 24212,
    tableNumber: 2,
    date: "2021-10-01",
    time: "20:00",
    status: "Active",
    total: "$200.00",
  },
  {
    id: 34215,
    tableNumber: 3,
    date: "2021-10-01",
    time: "21:05",
    status: "Completed",
    total: "$400.00",
  },
];

const Orders = () => {
  const [open, setOpen]: any = useOutletContext();

  useEffect(() => {
    document.title = "POS - Dashboard";
    setOpen(false);
  }, []);

  return (
    <>
      <PageTitle title="Orders" />
      <div className="flex flex-col gap-5 ">
        <OrdersCard />
      </div>
      <div className="bg-[#fafbfb] p-5 rounded-2xl shadow-lg mt-5">
        <table className="w-full">
          <thead>
            <tr className="">
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                ID
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Date
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Time
              </th>
              <th className="p-3 text-sm font-bold tracking-wide text-left">
                Total
              </th>
              {/* <th className="p-3 text-sm font-bold tracking-wide text-left">
                Status
              </th> */}
            </tr>
          </thead>
          <tbody className="">
            {TableData.map((item, index) => (
              <tr
                className=" border-[#e5e7eb] cursor-pointer rounded-lg hover:bg-[#f3f4f6]"
                onClick={() => console.log("test")}
                key={item.id}
              >
                <td className="p-3 text-sm text-gray-700">{item.id}</td>
                <td className="p-3 text-sm text-gray-700">
                  {item.tableNumber}
                </td>
                <td className="p-3 text-sm text-gray-700">{item.date}</td>
                <td className="p-3 text-sm text-gray-700">{item.time}</td>
                <td className="p-3 text-sm text-gray-700">{item.total}</td>
                {/* <td className="p-3 text-sm">
                  <span
                    className={`text-white py-1 px-2 rounded-md ${
                      item.status === "Completed"
                        ? "bg-[#7bcd80]"
                        : "bg-[#fee07a]"
                    }`}
                  >
                    {item.status}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddButton toolTipTitle="Add Order" navigateTo="/orders/new" />
    </>
  );
};
export default Orders;
