import React, { useState } from "react";
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

function CreateNote({ isOpen, toggle, userId, getNotes }) {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [loading, setloading] = useState(false);

  const create = async (e) => {
    e.preventDefault();
    if (title !== "" && description !== "") {
      const token = sessionStorage.getItem("token");
      const note = {
        userId,
        title,
        description,
      };
      setloading(true);
      await axios
        .post("http://localhost:8070/notes", note, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          alert(res.data.msg);
          setloading(false);
          settitle("");
          setdescription("");
          getNotes(userId, "", 5, 0);
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

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>New Note</ModalHeader>
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

export default CreateNote;
