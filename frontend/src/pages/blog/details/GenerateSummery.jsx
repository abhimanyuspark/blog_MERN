import { useState } from "react";
import Drawer from "../../../components/drawer/Drawer";
import { Button } from "../../../components/@comp/Buttons";
import MarkDown from "../../../components/markdown/MarkDown";
import axiosInstance from "../../../lib/axios";
import { API_ROUTES } from "../../../lib/routes";
import { LuSparkles } from "react-icons/lu";
import { GrRefresh } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const GenerateSummery = ({ blog, theme }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [summery, setSummery] = useState({
    loading: false,
    error: null,
    open: false,
    data: null,
  });

  const onGenerateSummery = async () => {
    setSummery((p) => ({
      ...p,
      open: true,
      data: null,
      error: null,
      loading: true,
    }));

    try {
      const response = await axiosInstance.post(
        API_ROUTES.AI.GEN_POST_SUMMERY,
        { content: blog?.content }
      );
      setSummery((p) => ({ ...p, data: response.data?.content }));
    } catch (error) {
      setSummery((p) => ({
        ...p,
        error:
          error?.message || error?.error || error || "Something went wrong...",
      }));
    } finally {
      setSummery((p) => ({ ...p, loading: false }));
    }
  };

  const onLogin = () => {
    toast.error("Please Login to Summerize it.");
    navigate("/login");
  };

  return (
    <div>
      <Button
        type="button"
        onClick={() => (user ? onGenerateSummery() : onLogin())}
        className="btn-accent btn-sm"
      >
        <LuSparkles /> Summerize Post
      </Button>

      <Drawer
        open={summery.open}
        setClose={() => {
          setSummery((p) => ({ ...p, open: false, error: null, data: null }));
        }}
        label={
          <div className="flex gap-2 items-center text-accent">
            <LuSparkles /> <span className="text-xl">Summery</span>
          </div>
        }
      >
        {summery?.error && (
          <p className="text-error text-sm text-center">{summery?.error}</p>
        )}

        {summery?.loading && (
          <p className="text-sm text-base-content/50 pt-12 flex gap-2 items-center justify-center">
            <span className="loading loading-spinner loading-sm"></span>
            <span>Generating Summery...</span>
          </p>
        )}

        <div className="p-4 pb-8">
          <MarkDown
            theme={theme === "light" ? true : false}
            content={
              summery.data?.replace(/^<p>/, "")?.replace(/<\/p>$/, "") || ""
            }
          />
        </div>

        {summery.data && (
          <div className="absolute bottom-0 left-0 pt-1 pb-2 w-[calc(100%-1rem)] h-auto flex justify-end items-center bg-base-100">
            <Button
              type="button"
              onClick={onGenerateSummery}
              className="btn-secondary btn-xs group"
            >
              <GrRefresh className="group-hover:rotate-360 transition duration-600 text-lg" />
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default GenerateSummery;
