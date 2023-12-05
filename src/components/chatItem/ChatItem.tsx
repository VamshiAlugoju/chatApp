import { Avatar } from "@mui/material";
import {} from "../../../src/helper/avatarColors";
import "./chatItem.css";
type chatItemProps = {
  id: string;
  Name: string;
  LastMsg?: string;
  src?: string;
  onClick: (userId: string) => void;
};

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function ChatItem(props: chatItemProps) {
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <div
      onClick={() => {
        props.onClick(props.id);
      }}
      className="chat_item"
    >
      <Avatar
        {...stringAvatar(props.Name)}
        alt={props.Name}
        // variant="rounded"
        src={props.src}
      />
      <div className="chatItem_info">
        <p className="chatItem_name">{props.Name}</p>
        <p className="chatItem_lasatMsg">
          {props.LastMsg?.slice(0, 25)}
          {props?.LastMsg?.length && props.LastMsg.length > 25 ? "..." : null}
        </p>
      </div>
    </div>
  );
}
