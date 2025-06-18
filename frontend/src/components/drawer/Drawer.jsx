const Drawer = ({ id, children }) => {
  return (
    <div className="drawer drawer-start z-50">
      <input id={id} type="checkbox" className="drawer-toggle" />

      <div className="drawer-side">
        <label
          htmlFor={id}
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        {/* all categories goes here */}
        <div className="menu bg-base-200 text-base-content min-h-full w-70 p-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
