import React, { useState, useEffect } from "react";
import { Input, Button, Table } from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import styles from "../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewUserModal from "./modals/NewUserModal";
import ViewUser from "./modals/ViewUser";

function Users({ user, setUser }) {
  const navigate = useNavigate();
  const [newUserModal, setnewUserModal] = useState(false);
  const [viewUserModal, setviewUserModal] = useState(false);
  const [loggedUser, setloggedUser] = useState("");
  const [selectedUser, setselectedUser] = useState({});
  const [users, setusers] = useState([]);

  //open/ close new user modal
  const newUserToggle = () => setnewUserModal(!newUserModal);

  //open/ close view user modal
  const viewUserToggle = () => {
    setviewUserModal(!viewUserModal);
  };

  //set user to view
  const setUsr = (user) => {
    setselectedUser(user);
    viewUserToggle();
  };

  //logout from account
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  //fetch all users
  const getUsers = async () => {
    const token = sessionStorage.getItem("token");
    await axios
      .get("http://localhost:8070/users", {
        headers: { "x-access-token": token },
      })
      .then((res) => {
        setusers(res.data.data);
        setselectedUser(res.data.data[0]);
      })
      .catch((err) => {
        alert("Error when fetching data.");
      });
  };

  useEffect(() => {
    if (user) {
      if (user.accountType === "admin") {
        setloggedUser(user);
        getUsers();
      } else {
        alert("You do not have permission to access this page.");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.horizontalCenterDiv}>
      <div className={styles.header}>
        <label className={styles.link} onClick={logout}>
          Logout
        </label>
      </div>
      <div className={styles.title}>
        <h1>Users</h1>
      </div>
      <div className={styles.contentHeader}>
        <Button
          color="primary"
          className={styles.btnCreate}
          onClick={newUserToggle}
        >
          <FaPlus />
          &nbsp; Create New User
        </Button>
      </div>
      <div className={styles.content}>
        <Table bordered hover striped>
          <thead>
            <tr>
              <th>#</th>
              <th> ID </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date Of Birth</th>
              <th>Mobile</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.mobile}</td>
                  <td>{user.accountType}</td>
                  <td>
                    <GrView
                      style={{ cursor: "pointer" }}
                      title="View Details"
                      onClick={() => setUsr(user)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <NewUserModal
        isOpen={newUserModal}
        toggle={newUserToggle}
        getUsers={getUsers}
      />
      <ViewUser
        isOpen={viewUserModal}
        toggle={viewUserToggle}
        user={selectedUser}
      />
    </div>
  );
}

export default Users;
