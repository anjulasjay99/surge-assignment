import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  InputGroupText,
  Input,
  InputGroup,
  Button,
  FormFeedback,
  Spinner,
} from "reactstrap";
import styles from "../styles/common.module.css";
import { useNavigate } from "react-router-dom";
import { FaUserAlt, FaKey } from "react-icons/fa";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const [feedback, setfeedback] = useState("");
  const [loading, setloading] = useState(false);

  //login to user account
  const login = (e) => {
    e.preventDefault();

    //check if user has entered both email and password
    if (email !== "" && password !== "") {
      setloading(true);
      //send request to the backend
      axios
        .post("http://localhost:8070/users/login", {
          email,
          password,
        })
        .then((res) => {
          setloading(false);
          //set feedback to default values
          seterror(false);
          setfeedback("");

          //save token and user in session storage
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("user", JSON.stringify(res.data.user));

          //check if user logged for the first time
          if (res.data.user.status === false) {
            navigate("/update-info");
          } else {
            //check the account type
            if (res.data.user.accountType === "admin") {
              navigate("/users");
            } else {
              navigate("/notes");
            }
          }
        })
        .catch((err) => {
          setloading(false);
          //display error
          seterror(true);
          setfeedback(err.response.data.msg);
        });
    } else {
      //display error
      seterror(true);
      setfeedback("Please enter both email & password.");
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }, []);

  return (
    <div className={styles.parentDiv}>
      <Form className={styles.form} onSubmit={(e) => login(e)} inline>
        <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>Log In</h2>
        <br />
        <FormGroup>
          <InputGroup>
            <InputGroupText>
              <FaUserAlt />
            </InputGroupText>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              invalid={error}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupText>
              <FaKey />
            </InputGroupText>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              invalid={error}
            />
            <FormFeedback invalid>{feedback}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <Button type="submit" color="primary">
          <Spinner size="sm" hidden={!loading}></Spinner>
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
