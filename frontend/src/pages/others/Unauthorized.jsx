import { Button } from "../../components/@comp/Buttons";
import { useNavigate } from "react-router";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-base-200">
      <div className="bg-base-100 border border-base-300 shadow-lg rounded-lg p-8 flex flex-col items-center">
        <svg
          className="w-16 h-16 text-error mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <line
            x1="8"
            y1="8"
            x2="16"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
          />
          <line
            x1="16"
            y1="8"
            x2="8"
            y2="16"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
        <h1 className="text-3xl font-bold text-error mb-2">Unauthorized</h1>
        <p className="text-gray-600 mb-6 text-center">
          You do not have permission to access this page.
        </p>
        <Button className="btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default Unauthorized;
