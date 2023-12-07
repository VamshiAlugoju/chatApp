import Modal from "@mui/material/Modal";
import "./addpeoplemodal.css";
import "./alllusermodal.css";
import { Avatar } from "@mui/material";
import Button from "@mui/material-next/Button";
import { Tooltip } from "react-tooltip";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect } from "react";
import axios from "axios";
import Header from "../../helper/constants";
import { localUrl } from "../../helper/Baseurls";
import CheckIcon from "@mui/icons-material/Check";
const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  height: 450,
  boxShadow: "24",
  pt: 2,
  px: 4,
  pb: 3,
};
export default function AddPeopleModal(props: any) {
  const [allPeople, setAllPeople] = React.useState<any>([]);

  useEffect(() => {
    (async () => {
      const headers = Header();

      const url = localUrl + "/group/getAllUsers/" + props.groupId;
      const response = await axios.get(url, headers);
      setAllPeople(response.data.data);
    })();
  }, []);

  function closeModal() {
    if (props.setShowAddPeople !== undefined) {
      props.setShowAddPeople(false);
    }
  }

  return (
    <>
      <Modal open={props.showAddPeople} onClose={closeModal}>
        <div style={style} className="addPeople_main_div">
          <h1
            style={{
              textAlign: "center",
              borderBottom: "1px solid black",
              paddingBottom: "0.5rem",
            }}
          >
            All Users
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {allPeople.map((item) => {
              return (
                <PeopleItem
                  _id={item._id}
                  name={item.name}
                  groupId={props.groupId}
                />
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}

function PeopleItem(props: peopleItemProps): JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const [added, setAdded] = React.useState(false);
  //   const reciever = useSelector((state: any) => state.reciever);
  // const dispatch = useDispatch();

  // function setCurrentChat() {
  //   dispatch({
  //     type: "UPDATERECIEVER",
  //     payload: { _id: props.id, name: props.name, src: props.src },
  //   });
  //   const chatListItem = {
  //     isGroup: false,
  //     hasUnread: false,
  //     users: [{ _id: props.id, name: props.name }],
  //   };
  //   dispatch({
  //     type: "UPDATEUSER",
  //     payload: chatListItem,
  //   });
  //   props.toggleAlluser && props.toggleAlluser();
  // }

  async function addToGroup() {
    try {
      setLoading(true);
      const url = localUrl + "/group/addToGroup";
      const headers = Header();
      const payload = {
        _id: props._id,
        groupId: props.groupId,
      };
      const response = await axios.post(url, payload, headers);

      setAdded(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
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
          data-tooltip-content="add to group"
          color="primary"
          disabled={false}
          size="small"
          variant="filled"
          onClick={addToGroup}
        >
          {added ? <CheckIcon /> : <AddIcon />}
        </Button>
        <Tooltip id="my-tooltip" />
      </div>
    </>
  );
}
