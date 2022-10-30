import DashboardCard from "@/components/dashboard-card";
import LineChart from "@/components/ui/lineChart";
import PageTitle from "@/components/ui/page-title";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [open, setOpen]: any = useOutletContext();
  const { user } = useAuth();

  useEffect(() => {
    document.title = "POS - Dashboard";
    setOpen(false);
  }, []);

  return (
    <>
      <PageTitle title='Dashboard' email={user.email}/>
      <div className="flex flex-col gap-5">
        <DashboardCard />
        <div className="rounded-3xl bg-[#eefcef] w-full h-[300px] md:h-[426px] mb-5 p-7 shadow-lg">
          <LineChart />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
