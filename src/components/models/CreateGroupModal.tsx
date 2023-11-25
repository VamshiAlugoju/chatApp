import "./creategroupmodal.css";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";

type createGroupProps = {
  showCreateGroup: boolean;
  toggleCreateGroup: () => void;
};
const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  height: 400,
  boxShadow: "24",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function CreateGroupModal(props: createGroupProps) {
  return (
    <>
      <Modal
        open={props.showCreateGroup}
        onClose={props.toggleCreateGroup}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="create_group_div" style={style}></div>
      </Modal>
    </>
  );
}
