// import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
// import Modal from "react-modal";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material-next/Button";
import "./alllusermodal.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import { localUrl } from "../../helper/Baseurls";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

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

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      const url = localUrl + "/user/allUsers";
      const token = localStorage.getItem("token");
      const result = await axios.get(url, {
        headers: { Authorization: token },
      });
      const data = result.data.data;
      setUserList(data);
    })();
  }, []);

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
          {userList.map((item: any) => {
            return PeopleItem({
              name: item.name,
              src: item.src,
              toggleAlluser: props.toggleAlluser,
              id: item._id,
            });
          })}
        </div>
      </Modal>
    </>
  );
}

type peopleItemProps = {
  id?: string;
  name?: string;
  src?: string;
  toggleAlluser?: () => void;
};

function PeopleItem(props: peopleItemProps) {
  // const reciever = useSelector((state: any) => state.reciever);
  const dispatch = useDispatch();

  function setCurrentChat() {
    dispatch({
      type: "UPDATERECIEVER",
      payload: { _id: props.id, name: props.name, src: props.src },
    });
    const chatListItem = {
      isGroup: false,
      hasUnread: false,
      users: [{ _id: props.id, name: props.name }],
    };
    dispatch({
      type: "UPDATEUSER",
      payload: chatListItem,
    });
    props.toggleAlluser && props.toggleAlluser();
  }

  return (
    <>
      <div className="people_item">
        <Avatar src={props.src} />
        <div className="people_item_name_div">
          <p className="people_item_name">{props.name}</p>
        </div>
        <Button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Send Message"
          color="primary"
          disabled={false}
          size="small"
          variant="filled"
          onClick={setCurrentChat}
        >
          <SendIcon />
        </Button>
        <Tooltip id="my-tooltip" />
      </div>
    </>
  );
}
