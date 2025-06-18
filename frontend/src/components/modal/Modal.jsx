const Modal = ({ id, children }) => {
  return (
    <div>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">{children}</div>

        <label className="modal-backdrop" htmlFor={id}></label>
      </div>
    </div>
  );
};

export default Modal;
