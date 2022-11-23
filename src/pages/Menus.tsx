import Tabs from "@/components/tabs";
import AddButton from "@/components/ui/add-btn";
import PageTitle from "@/components/ui/page-title";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Menus = () => {
  const navigate = useNavigate();
  const [open, setOpen]: any = useOutletContext();

  useEffect(() => {
    document.title = "POS - Menus";
    setOpen(false);
  }, []);

  return (
    <>
      <PageTitle title="Menu" />
      <div className="mt-5 md:mb-5">
        <Tabs />
      </div>
      <AddButton toolTipTitle="Add Menu" navigateTo="/menus/add" />
    </>
  );
};
export default Menus;
