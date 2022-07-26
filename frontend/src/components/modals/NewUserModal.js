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
  FormText,
} from "reactstrap";
import styles from "../../styles/common.module.css";
import axios from "axios";

function NewUserModal({ isOpen, toggle, getUsers }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [accountType, setaccountType] = useState("admin");
  const [loading, setloading] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");

  const create = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const mailformat = /^\S+@\S+\.\S+$/; //email format to check validity of the email
      //check if entered email is valid
      if (email.match(mailformat)) {
        //check if password contains at least 8 characters
        if (password.length >= 8) {
          //check if passwords match
          if (password === confirmPassword) {
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
                getUsers("", 5, 0);
                toggle();
              })
              .catch((err) => {
                setloading(false);
                alert(err.response.data.msg);
              });
          } else {
            alert("Passwords do not match.");
          }
        } else {
          alert("Password must contain at least 8 characters");
        }
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
            <FormText>Password must contain at least 8 characters</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="confpassword">Confirm Password</Label>
            <Input
              id="confpassword"
              name="confpassword"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </FormGroup>
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
        </Form>
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
