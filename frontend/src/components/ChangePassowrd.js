import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Button,
  Spinner,
  FormText,
  Label,
  FormFeedback,
} from "reactstrap";
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
  const [curPasswordFeedback, setcurPasswordFeedback] = useState("");
  const [invalidCurPassword, setinvalidCurPassword] = useState(false);
  const [invalidPassword, setinvalidPassword] = useState(false);
  const [passwordFeedback, setpasswordFeedback] = useState("");
  const [invalidConfPassword, setinvalidConfPassword] = useState(false);
  const [confPasswordFeedback, setconfPasswordFeedback] = useState("");

  //update user info
  const submit = (e) => {
    e.preventDefault();

    //check whether user has filled all the fields or not
    if (curPassword !== "" && newPassword !== "" && rePassword !== "") {
      //check if the current password is correct
      if (password === curPassword) {
        setinvalidCurPassword(false);
        setcurPasswordFeedback("");
        //check if new password is the same as old password
        if (newPassword !== curPassword) {
          setinvalidPassword(false);
          setpasswordFeedback("");
          //check if new password contains at least 8 characters
          if (newPassword.length >= 8) {
            setinvalidPassword(false);
            setpasswordFeedback("");
            //check if new password and re-entered password match
            if (newPassword === rePassword) {
              setinvalidConfPassword(false);
              setconfPasswordFeedback("");
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
              setinvalidConfPassword(true);
              setconfPasswordFeedback("Password does not match");
            }
          } else {
            setinvalidPassword(true);
            setinvalidConfPassword(false);
            setpasswordFeedback("Password must contain at least 8 characters");
          }
        } else {
          //display error
          setinvalidPassword(true);
          setinvalidConfPassword(false);
          setpasswordFeedback("You can not use the old password");
        }
      } else {
        //display error
        setinvalidCurPassword(true);
        setinvalidPassword(false);
        setinvalidConfPassword(false);
        setcurPasswordFeedback("Incorrect password");
      }
    } else {
      //display error
      alert("Please fill all the fields!");
    }
  };

  useEffect(() => {
    if (location.state) {
      if (location.state.data) {
        const user = JSON.parse(sessionStorage.getItem("user"));
        if (!(user === "" || user === undefined || user == null)) {
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
          <Label for="curPassword">Current Password</Label>
          <Input
            type="password"
            id="curPassword"
            placeholder="Current Password"
            value={curPassword}
            onChange={(e) => setcurPassword(e.target.value)}
            invalid={invalidCurPassword}
          />
          <FormFeedback invalid>{curPasswordFeedback}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setnewPassword(e.target.value)}
            invalid={invalidPassword}
          />
          <FormFeedback invalid>{passwordFeedback}</FormFeedback>
          <FormText hidden={invalidPassword}>
            Password must contain at least 8 characters
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="rePassword">Confirm New Password</Label>
          <Input
            type="password"
            id="rePassword"
            placeholder="Confirm New Password"
            value={rePassword}
            onChange={(e) => setrePassword(e.target.value)}
            invalid={invalidConfPassword}
          />
          <FormFeedback invalid>{confPasswordFeedback}</FormFeedback>
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
