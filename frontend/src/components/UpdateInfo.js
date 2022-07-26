import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button, Label } from "reactstrap";
import styles from "../styles/common.module.css";
import { useNavigate } from "react-router-dom";

function UpdateInfo() {
  const navigate = useNavigate();
  const [id, setid] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [mobile, setmobile] = useState();
  const [email, setemail] = useState("");

  //called when user submits the form
  const updateInfo = (e) => {
    e.preventDefault();

    //check whether user has filled all the fields or not
    if (
      firstName !== "" &&
      lastName !== "" &&
      dateOfBirth !== "" &&
      mobile !== "" &&
      email !== ""
    ) {
      //create data object
      const data = {
        id,
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
      };

      //navigate to change password page
      navigate("/change-password", { state: { data } });
    } else {
      //display error
      alert("Please fill all the fields!");
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!(user === "" || user === undefined || user == null)) {
      setemail(user.email);
      setid(user.id);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className={styles.parentDiv}>
      <Form className={styles.form} onSubmit={(e) => updateInfo(e)} inline>
        <h2 style={{ textAlign: "center", fontWeight: "bolder" }}>
          Update Your Info
        </h2>
        <br />
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            title="first name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            title="last name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            title="email"
            disabled
          />
        </FormGroup>
        <Label for="dateOfBirth">Date Of Birth</Label>
        <FormGroup>
          <Input
            type="date"
            id="dateOfBirth"
            placeholder="Date of birth"
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
            title="date of birth"
          />
        </FormGroup>
        <Label for="mobile">Mobile</Label>
        <FormGroup>
          <Input
            type="tel"
            id="mobile"
            placeholder="Mobile No."
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
            title="mobile number"
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Confirm & Continue
        </Button>
      </Form>
    </div>
  );
}

export default UpdateInfo;
