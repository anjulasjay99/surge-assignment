import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";

function ViewUser({ isOpen, toggle, user }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>User Info</ModalHeader>
      <ModalBody>
        <Label>
          <strong>User ID :&nbsp;</strong>
          {user.id}
        </Label>
        <br />
        <Label>
          <strong>First Name :&nbsp;</strong>
          {user.firstName}
        </Label>
        <br />
        <Label>
          <strong>Last Name :&nbsp;</strong>
          {user.lastName}
        </Label>
        <br />
        <Label>
          <strong>E-Mail :&nbsp;</strong>
          {user.email}
        </Label>
        <br />
        <Label>
          <strong>Date Of Birth :&nbsp;</strong>
          {user.dateOfBirth}
        </Label>
        <br />
        <Label>
          <strong>Mobile :&nbsp;</strong>
          {user.mobile}
        </Label>
        <br />
        <Label>
          <strong>Account Type :&nbsp;</strong>
          {user.accountType}
        </Label>
        <br />
        <Label>
          <strong>Has Logged In :&nbsp;</strong>
          {user.status ? "Yes" : "No"}
        </Label>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ViewUser;
