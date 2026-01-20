import SignupComponent from "../users/SignupComponent";

type Props = {
  setShowModal: (val: boolean) => void;
};

function UserModalComponent({ setShowModal }: Props) {
  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "#4e5052cc" }}
      tabIndex={-1}
      aria-labelledby="addProductModalLabel"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProductModalLabel">
              Register
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <SignupComponent setShowModal={setShowModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModalComponent;
