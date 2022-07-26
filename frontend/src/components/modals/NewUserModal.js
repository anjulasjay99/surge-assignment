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
  FormFeedback,
} from "reactstrap";
import styles from "../../styles/common.module.css";
import axios from "axios";

function NewUserModal({ isOpen, toggle, getUsers }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [accountType, setaccountType] = useState("admin");
  const [loading, setloading] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState("");
  const [invalidEmail, setinvalidEmail] = useState(false);
  const [emailFeedback, setemailFeedback] = useState("");
  const [invalidPassword, setinvalidPassword] = useState(false);
  const [passwordFeedback, setpasswordFeedback] = useState("");
  const [invalidConfPassword, setinvalidConfPassword] = useState(false);
  const [confPasswordFeedback, setconfPasswordFeedback] = useState("");

  const create = async (e) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const mailformat = /^\S+@\S+\.\S+$/; //email format to check validity of the email
      //check if entered email is valid
      if (email.match(mailformat)) {
        setinvalidEmail(false);
        setemailFeedback("");
        //check if password contains at least 8 characters
        if (password.length >= 8) {
          setinvalidPassword(false);
          setpasswordFeedback("");
          //check if passwords match
          if (password === confirmPassword) {
            setinvalidConfPassword(false);
            setconfPasswordFeedback("");

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
            //display error
            setinvalidConfPassword(true);
            setconfPasswordFeedback("Passwords do not match.");
          }
        } else {
          //display error
          setinvalidConfPassword(false);
          setinvalidPassword(true);
          setpasswordFeedback("Password must contain at least 8 characters");
        }
      } else {
        //display error
        setinvalidPassword(false);
        setinvalidConfPassword(false);
        setinvalidEmail(true);
        setemailFeedback("Invalid email address");
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
              invalid={invalidEmail}
            />
            <FormFeedback invalid>{emailFeedback}</FormFeedback>
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
              invalid={invalidPassword}
            />
            <FormFeedback invalid>{passwordFeedback}</FormFeedback>
            <FormText hidden={invalidPassword}>
              Password must contain at least 8 characters
            </FormText>
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
              invalid={invalidConfPassword}
            />
            <FormFeedback invalid>{confPasswordFeedback}</FormFeedback>
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
