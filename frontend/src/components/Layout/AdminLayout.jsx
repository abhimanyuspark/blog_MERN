import { NavLink, Outlet } from "react-router";
import { adminSideData } from "../../utils/constants";
import Navbar from "../nav/Navbar";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <Navbar />

      <div className="grid sm:grid-cols-[15rem_1fr] grid-cols-1">
        <div className="p-4 hidden sm:flex gap-8 flex-col bg-base-100 sticky top-16 left-0 h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="w-full">
            <h5 className="text-lg">{user?.fullName}</h5>
            <p className="text-xs text-base-content/50 break-all truncate">
              {user?.email}
            </p>
          </div>

          <ul className="flex gap-2 flex-col">
            {adminSideData.map((a, i) => (
              <li key={i}>
                <NavLink
                  to={a.path}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-accent"
                        : "text-base-content/50 hover:bg-base-300"
                    } flex items-center gap-4 px-4 py-2 rounded  hover:text-base-content cursor-pointer`
                  }
                >
                  {a.icon()}
                  {a.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 relative">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
