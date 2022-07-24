import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import styles from "../../styles/common.module.css";

function ViewNote({ note, isOpen, toggle }) {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Note</ModalHeader>
      <ModalBody>
        <Label>
          <strong>Title :&nbsp;</strong>
          {note.title}
        </Label>
        <br />
        <Label>
          <strong>Description :&nbsp;</strong>
        </Label>
        <p>{note.description}</p>
        <br />
        <Label style={{ color: "grey" }}>
          Date :&nbsp;
          {new Date(note.dateCreated).toLocaleString()}
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

export default ViewNote;
