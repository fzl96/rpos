/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardCard from '@/components/dashboard-card';
import LineChart from '@/components/ui/lineChart';
import PageTitle from '@/components/ui/page-title';
import { useOrder } from '@/context/OrderContext';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  // const [, setOpen]: boolean = useOutletContext();
  const { loading } = useOrder();
  const { user } = useAuth();

  useEffect(() => {
    document.title = 'POS - Dashboard';
    // setOpen(false);
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <PageTitle title="Dashboard" email={user.email} />
      <motion.div
        className="flex flex-col gap-5"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <DashboardCard />
        <div className="rounded-3xl bg-[#eefcef] w-full h-[300px] md:h-[426px] mb-5 p-7 shadow-lg">
          <LineChart />
        </div>
      </motion.div>
    </>
  );
}
export default Dashboard;
