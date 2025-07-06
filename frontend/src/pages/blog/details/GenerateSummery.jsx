import { useState } from "react";
import Drawer from "../../../components/drawer/Drawer";
import { Button } from "../../../components/@comp/Buttons";
import MarkDown from "../../../components/markdown/MarkDown";
import axiosInstance from "../../../lib/axios";
import { API_ROUTES } from "../../../lib/routes";
import { LuSparkles } from "react-icons/lu";
import { GrRefresh } from "react-icons/gr";

const GenerateSummery = ({ blog, theme }) => {
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

  return (
    <div>
      <Button
        type="button"
        onClick={onGenerateSummery}
        className="btn-accent btn-sm"
      >
        <LuSparkles /> Summerize Post
      </Button>

      <Drawer
        open={summery.open}
        setClose={() => {
          setSummery((p) => ({ ...p, open: false, error: null, data: null }));
        }}
        label="Summery"
      >
        {summery?.error && (
          <p className="text-error text-sm text-center">{summery?.error}</p>
        )}

        {summery?.loading && (
          <p className="text-sm text-base-content/50 pt-10 p-4 flex gap-2 items-center justify-center">
            <span className="loading loading-spinner loading-sm"></span>
            <span>Generating Summery...</span>
          </p>
        )}

        <div className="p-4">
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
              <GrRefresh className="group-hover:rotate-360 transition duration-400 text-lg" />
            </Button>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default GenerateSummery;
