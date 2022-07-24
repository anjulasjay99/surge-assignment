import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Table,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap";
import { FaPlus } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import styles from "../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewUserModal from "./modals/NewUserModal";
import ViewUser from "./modals/ViewUser";

function Users() {
  const navigate = useNavigate();
  const [newUserModal, setnewUserModal] = useState(false);
  const [viewUserModal, setviewUserModal] = useState(false);
  const [loggedUser, setloggedUser] = useState("");
  const [selectedUser, setselectedUser] = useState({});
  const [users, setusers] = useState([]);
  const [stext, setstext] = useState("");
  const [pages, setpages] = useState([0]);
  const [curPage, setcurPage] = useState(0);

  //search
  const search = (keyword) => {
    if (keyword !== "") {
      setstext(keyword);
      getUsers(keyword, 5, 0);
    } else {
      setstext("");
      getUsers("", 5, 0);
    }
  };

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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  //fetch all users
  const getUsers = async (keyword, limit, page) => {
    if (page >= 0 && page < pages.length) {
      const token = sessionStorage.getItem("token");
      await axios
        .get(
          `http://localhost:8070/users?keyword=${keyword}&limit=${limit}&page=${page}`,
          {
            headers: { "x-access-token": token },
          }
        )
        .then((res) => {
          setusers(res.data.data);
          const plength = res.data.pages;
          let pArr = [];
          for (let i = 0; i < plength; i++) {
            pArr.push(i + 1);
          }
          setpages(pArr);
          setcurPage(page);
        })
        .catch((err) => {
          alert("Error when fetching data.");
        });
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!(user === "" || user === undefined || user == null)) {
      if (user.accountType === "admin") {
        setloggedUser(user);
        getUsers("", 5, 0);
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
        <Input
          id="search"
          name="search"
          className={styles.searchInput}
          placeholder="Search by name, email"
          type="text"
          value={stext}
          onChange={(e) => search(e.target.value)}
        />
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
        <Table bordered striped>
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
                  <th scope="row">{curPage * 5 + (index + 1)}</th>
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
      <div>
        <Pagination>
          <PaginationItem>
            <PaginationLink first onClick={() => getUsers("", 5, 0)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => getUsers("", 5, curPage - 1)}
              previous
            />
          </PaginationItem>
          {pages.map((p) => {
            return (
              <PaginationLink onClick={() => getUsers("", 5, p - 1)}>
                {p}
              </PaginationLink>
            );
          })}

          <PaginationItem>
            <PaginationLink onClick={() => getUsers("", 5, curPage + 1)} next />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => getUsers("", 5, pages.length - 1)}
              last
            />
          </PaginationItem>
        </Pagination>
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
