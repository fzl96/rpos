import OrdersCard from "@/components/orders-cards";
import PageTitle from "@/components/ui/page-title";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

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
    </>
  );
};
export default Orders;
