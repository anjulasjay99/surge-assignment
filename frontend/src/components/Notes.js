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
import { MdDeleteForever } from "react-icons/md";
import styles from "../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NewUserModal from "./modals/NewUserModal";
import ViewUser from "./modals/ViewUser";
import ViewNote from "./modals/ViewNote";
import CreateNote from "./modals/CreateNote";
import { FaUserEdit } from "react-icons/fa";
import EditNote from "./modals/EditNote";

function Notes({ setUser, user }) {
  const navigate = useNavigate();
  const [loggedUser, setloggedUser] = useState("");
  const [viewNote, setviewNote] = useState(false);
  const [createNote, setcreateNote] = useState(false);
  const [editNote, seteditNote] = useState(false);
  const [notes, setnotes] = useState([]);
  const [selectedNote, setselectedNote] = useState({});
  const [pages, setpages] = useState([]);
  const [curPage, setcurPage] = useState(0);

  //toggle view note modal
  const toggleViewNote = () => {
    setviewNote(!viewNote);
  };

  //toggle create note modal
  const toggleCreateNote = () => {
    setcreateNote(!createNote);
  };

  //toggle edit note modal
  const toggleEditNote = () => {
    seteditNote(!editNote);
  };

  //set selected note
  const viewSelectedNote = (note) => {
    setselectedNote(note);
    toggleViewNote();
  };

  //edit note
  const viewEditNote = (note) => {
    setselectedNote(note);
    toggleEditNote();
  };

  //logout from account
  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  //delete note
  const deleteNote = async (note) => {
    if (
      window.confirm(`Are you sure you want to delete note "${note.title}"?`)
    ) {
      const token = sessionStorage.getItem("token");
      await axios
        .delete(`http://localhost:8070/notes/${note._id}`, {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          alert("Deleted successfully");
          getNotes(user.id, 5, 0);
        })
        .catch((err) => {
          alert("Error");
        });
    }
  };

  //get all notes created by user
  const getNotes = async (id, limit, page) => {
    const token = sessionStorage.getItem("token");
    await axios
      .get(`http://localhost:8070/notes/${id}?limit=${limit}&page=${page}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setnotes(res.data.data);
        const plength = res.data.pages;
        let pArr = [];
        for (let i = 0; i < plength; i++) {
          pArr.push(i + 1);
        }
        setpages(pArr);
        setcurPage(page);
      })
      .catch((err) => {
        alert("Error fecthing data");
      });
  };

  useEffect(() => {
    if (user) {
      if (user.accountType === "student") {
        setloggedUser(user);
        getNotes(user.id, 5, 0);
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
        <h1>Notes</h1>
      </div>
      <div className={styles.contentHeader}>
        <Button
          color="primary"
          className={styles.btnCreate}
          onClick={toggleCreateNote}
        >
          <FaPlus />
          &nbsp; Create New Note
        </Button>
      </div>
      <div className={styles.content}>
        <Table bordered striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Title </th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => {
              return (
                <tr key={note._id}>
                  <th scope="row">{curPage * 5 + (index + 1)}</th>
                  <td>{note.title}</td>
                  <td>{new Date(note.dateCreated).toLocaleString()}</td>
                  <td>
                    <GrView
                      style={{ cursor: "pointer" }}
                      title="View Note"
                      onClick={() => viewSelectedNote(note)}
                    />
                    &nbsp; &nbsp;
                    <FaUserEdit
                      title="Edit Note"
                      style={{ marginRight: "10px", cursor: "pointer" }}
                      onClick={() => viewEditNote(note)}
                    />
                    &nbsp;
                    <MdDeleteForever
                      style={{ cursor: "pointer" }}
                      title="Delete Note"
                      onClick={() => deleteNote(note)}
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
            <PaginationLink first onClick={() => getNotes(user.id, 5, 0)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => getNotes(user.id, 5, curPage - 1)}
              previous
            />
          </PaginationItem>
          {pages.map((p) => {
            return (
              <PaginationLink onClick={() => getNotes(user.id, 5, p - 1)}>
                {p}
              </PaginationLink>
            );
          })}

          <PaginationItem>
            <PaginationLink
              onClick={() => getNotes(user.id, 5, curPage + 1)}
              next
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              onClick={() => getNotes(user.id, 5, pages.length - 1)}
              last
            />
          </PaginationItem>
        </Pagination>
      </div>
      <ViewNote isOpen={viewNote} toggle={toggleViewNote} note={selectedNote} />
      <CreateNote
        isOpen={createNote}
        toggle={toggleCreateNote}
        userId={user.id}
        getNotes={getNotes}
      />
      <EditNote
        note={selectedNote}
        isOpen={editNote}
        toggle={toggleEditNote}
        userId={user.id}
        getNotes={getNotes}
      />
    </div>
  );
}

export default Notes;
