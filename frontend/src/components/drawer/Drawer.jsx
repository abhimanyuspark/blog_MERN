import { motion, AnimatePresence } from "motion/react";
import { Button } from "../@comp/Buttons";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";

const Drawer = ({ open, setClose, children, label = "Label" }) => {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/50 flex justify-center"
          onClick={() => setClose()}
        >
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "20%" }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[95%] max-w-2xl h-auto"
          >
            {/* content */}
            <div
              className="w-full h-auto bg-base-100 border-l border-base-300 shadow-xl flex flex-col relative rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-base-300 flex justify-between items-center">
                <h3 className="font-semibold">{label}</h3>
                <Button
                  onClick={() => setClose()}
                  className="btn-accent btn-sm"
                >
                  <FiX className="text-xl" />
                </Button>
              </div>
              <div className="overflow-auto h-auto max-h-90">{children}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
