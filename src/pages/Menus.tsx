import Tabs from "@/components/tabs";
import PageTitle from "@/components/ui/page-title";
import { IconButton, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
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
      <PageTitle title="Menus" />
      <div className="mt-5 md:mb-5">
        <Tabs />
      </div>
      <div className="fixed bottom-10 md:right-20 right-10">
        <Tooltip title="Add Menu" placement="left" arrow>
          <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.1}}>
            <IconButton
              sx={{
                backgroundColor: "#111827",
                color: "#fff",
                padding: "0.75rem",
                "&:hover": {
                  backgroundColor: "#111827",
                  color: "#fff",
                },
              }}
              onClick={() => navigate("/menus/add")}
            >
              <HiOutlinePlusSm />
            </IconButton>
          </motion.div>
        </Tooltip>
      </div>
    </>
  );
};
export default Menus;
