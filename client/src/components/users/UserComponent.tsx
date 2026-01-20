import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

import useUserService from "../../services/user.service";
import { type User } from "../../types/user.types";
import UserModalComponent from "../products/UserModalComponent";

export interface userData {
  count: number;
  data: User[];
}

function UserComponent() {
  const [users, setUsers] = useState<userData>();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const { getUsers } = useUserService();

  useEffect(() => {
    if (!showModal) {
      try {
        const fetchUsers = async () => {
          const res = await getUsers();
          setUsers(res);
        };
        fetchUsers();
      } catch (error) {
        const errMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch users, please try again!";
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${errMessage}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } finally {
        setLoading(false);
      }
    }
  }, [showModal]);

  return (
    <>
      <div>
        <button
          className="btn btn-primary fw-bold"
          onClick={() => setShowModal(true)}
        >
          Create User
        </button>
      </div>
      {loading ? (
        <p>Loading</p>
      ) : !users?.count ? (
        <p>No users found</p>
      ) : (
        <div className="border rounded shadow p-4">
          <p className="fw-bold">No of Users: {users.count}</p>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.data?.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <MdEdit className="text-primary me-2" />
                    <MdDeleteOutline className="text-danger" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && <UserModalComponent setShowModal={setShowModal} />}
    </>
  );
}

export default UserComponent;
