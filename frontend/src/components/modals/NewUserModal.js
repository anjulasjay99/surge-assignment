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

function NewUserModal({ isOpen, toggle, getUsers }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [accountType, setaccountType] = useState("admin");
  const [loading, setloading] = useState(false);

  const create = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const mailformat = /^\S+@\S+\.\S+$/;
      if (email.match(mailformat)) {
        const token = sessionStorage.getItem("token");
        const user = { email, password, accountType };
        setloading(true);
        await axios
          .post("http://localhost:8070/users", user, {
            headers: { "x-access-token": token },
          })
          .then((res) => {
            alert(res.data.msg);
            setloading(false);
            getUsers();
            toggle();
          })
          .catch((err) => {
            setloading(false);
            alert(err.response.data.msg);
          });
      } else {
        alert("Invalid email address.");
      }
    } else {
      alert("Please fill all the details.");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New User</ModalHeader>
      <ModalBody>
        <Form className={styles.modalForm} inline>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </FormGroup>
        </Form>

        <FormGroup>
          <Label for="accountType">Account Type</Label>
          <Input
            id="accountType"
            name="accountType"
            type="select"
            value={accountType}
            onChange={(e) => setaccountType(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="student">Student</option>
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={create}>
          <Spinner size="sm" hidden={!loading}></Spinner>
          Confirm
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewUserModal;
