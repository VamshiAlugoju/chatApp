import "./creategroupmodal.css";
import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import { Button, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { localUrl } from "../../helper/Baseurls";
import Header from "../../helper/constants";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";

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
  const reciever = useSelector((state: any) => state.reciever);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const url = localUrl + "/group/createGroup";
      const data = {
        gName: name,
        about,
      };
      const headers = Header();
      const result = await axios.post(url, data, headers);

      dispatch({
        type: "UPDATERECIEVER",
        payload: { isGroup: true, group: result.data.Group },
      });
      const chatListItem = {
        isGroup: true,
        gname: name,
        groupId: result.data.Group._id,
      };
      dispatch({
        type: "UPDATEUSER",
        payload: chatListItem,
      });
      setIsLoading(false);
      props.toggleCreateGroup();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  return (
    <>
      <Modal
        open={props.showCreateGroup}
        onClose={props.toggleCreateGroup}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="create_group_div" style={style}>
          <form onSubmit={handleSubmit}>
            <div className="create_group_form_div">
              <div className="create_group_header">
                <h1> Create Group</h1>
              </div>
              <InputLabel htmlFor="name">Name</InputLabel>
              <TextField
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <InputLabel htmlFor="about">About</InputLabel>
              <TextField
                id="about"
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                fullWidth
              />

              <Button variant="contained" type="submit">
                Create
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
