import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold mt-4 text-base-content">
          Page Not Found
        </h2>
        <p className="mt-2 text-lg text-base-content/70">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link to={-1} className="btn btn-primary mt-6">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
