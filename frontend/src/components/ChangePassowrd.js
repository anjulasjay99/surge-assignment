import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button, Spinner } from "reactstrap";
import styles from "../styles/common.module.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ChangePassowrd({ user }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setpassword] = useState("");
  const [curPassword, setcurPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [rePassword, setrePassword] = useState("");
  const [data, setdata] = useState("");
  const [token, settoken] = useState("");
  const [loading, setloading] = useState(false);

  //update user info
  const submit = (e) => {
    e.preventDefault();

    //check whether user has filled all the fields or not
    if (curPassword !== "" && newPassword !== "" && rePassword !== "") {
      //check if the current password is correct
      if (password === curPassword) {
        //check if new password and re-entered password match
        if (newPassword === rePassword) {
          //create user object
          const user = {
            ...data,
            password: newPassword,
          };
          setloading(true);
          //calll the endpoint to update user info
          axios
            .put("http://localhost:8070/users", user, {
              headers: { "x-access-token": token },
            })
            .then((res) => {
              setloading(false);
              alert("Info updated successfully!");
              //navigate to login
              navigate("/login");
            })
            .catch((err) => {
              setloading(false);
              //display error
              alert(err.response.data.msg);
            });
        } else {
          //display error
          alert("Password does not match");
        }
      } else {
        //display error
        alert("Current password is incorrect");
      }
    } else {
      //display error
      alert("Please fill all the fields!");
    }
  };

  useEffect(() => {
    if (location.state) {
      if (location.state.data) {
        if (user) {
          setdata(location.state.data); //get user details sent from update info component
          setpassword(user.password); //get user's password
          settoken(sessionStorage.getItem("token")); //get the json web token stored in session storage
        } else {
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.parentDiv}>
      <Form className={styles.form} onSubmit={(e) => submit(e)} inline>
        <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
          Change Password
        </h2>
        <br />

        <FormGroup>
          <Input
            type="password"
            id="curPassword"
            placeholder="Current Password"
            value={curPassword}
            onChange={(e) => setcurPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            id="rePassword"
            placeholder="Confirm New Password"
            value={rePassword}
            onChange={(e) => setrePassword(e.target.value)}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          <Spinner size="sm" hidden={!loading}></Spinner>
          Confirm
        </Button>
      </Form>
    </div>
  );
}

export default ChangePassowrd;
