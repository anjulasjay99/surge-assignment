import React, { useState, useEffect } from "react";
import {
  Input,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  Label,
} from "reactstrap";
import styles from "../../styles/common.module.css";
import axios from "axios";

function EditNote({ note, isOpen, toggle, getNotes, userId }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);

  const create = async (e) => {
    e.preventDefault();
    if (title !== "" && description !== "") {
      const token = sessionStorage.getItem("token");
      const newNote = {
        id: note._id,
        title,
        description,
      };
      setloading(true);
      await axios
        .put("http://localhost:8070/notes", newNote, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          alert(res.data.msg);
          setloading(false);
          settitle("");
          setdescription("");
          getNotes(userId, 5, 0);
          toggle();
        })
        .catch((err) => {
          setloading(false);
          alert(err.response.data.msg);
        });
    } else {
      alert("Please fill all the details");
    }
  };

  useEffect(() => {
    settitle(note.title);
    setdescription(note.description);
  }, [note]);

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Edit Note</ModalHeader>
      <ModalBody>
        <Form className={styles.modalForm} inline>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="Description">Description</Label>
            <Input
              id="description"
              name="description"
              type="textarea"
              placeholder="Write here..."
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              style={{ height: "200px" }}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={create}>
          <Spinner size="sm" hidden={!loading}></Spinner>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default EditNote;
