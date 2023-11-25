// import { Modal } from "flowbite-react";
import { useState } from "react";
// import Modal from "react-modal";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material-next/Button";
import "./alllusermodal.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

type allUserProps = {
  allUserModal: boolean;
  toggleAlluser: () => void;
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
export default function AllUsersModal(props: allUserProps) {
  // const [users,setusers] = useState([])
  const customStyles = {
    width: "100px",
    border: "white",
  };

  return (
    <>
      <Modal
        open={props.allUserModal}
        onClose={props.toggleAlluser}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="all_user_modal" style={style}>
          <div className="all_user_modal_header">
            <h2>AllUsers</h2>
          </div>
          {PeopleItem()}
          {PeopleItem()}
        </div>
      </Modal>
    </>
  );
}

function PeopleItem() {
  return (
    <>
      <div className="people_item">
        <Avatar />
        <div className="people_item_name_div">
          <p className="people_item_name">Name</p>
        </div>
        <Button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Send Message"
          color="primary"
          disabled={false}
          size="small"
          variant="filled"
        >
          <SendIcon />
        </Button>
        <Tooltip id="my-tooltip" />
      </div>
    </>
  );
}
