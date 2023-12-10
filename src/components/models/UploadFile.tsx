import ReactDOM from "react-dom";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";

import Modal from "@mui/material/Modal";
import { Avatar } from "@mui/material";
import Button from "@mui/material-next/Button";
import { Tooltip } from "react-tooltip";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect } from "react";
import axios from "axios";
import Header from "../../helper/constants";
import { localUrl } from "../../helper/Baseurls";
import CheckIcon from "@mui/icons-material/Check";
import "./uploadfile.css"

const style = {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // height:250,
    backgroundColor: "white",
    boxShadow: "24",
    pt: 2,
    px: 4,
    pb: 10,
  };

 export default function UploadFile(props : any) {
  const [files, setFiles] = React.useState([]);
    const disable = files.length === 0;
  const updateFiles = (incommingFiles :any)  => {
    setFiles(incommingFiles);
    console.log(incommingFiles)
  };
  function closeModal(){
    console.log("called inup")
    props.closeModal();
  }
  function upload(){
    props.uploadFiles(files)
    closeModal()
  }
  return (
    <Modal open={props.showUpload} onClose={closeModal} >
        <div style={style}>
    <Dropzone maxFiles={1} behaviour="replace" label="click or drag files here" footer={true} onChange={updateFiles} value={files}>
      {files.map((file :any) => (
        <FileMosaic {...file} preview />
      ))}
    </Dropzone>
    <div className="uploadFileButton_div" style={{width:"100%" , height:"60px"}}>
    <Button onClick={closeModal} variant="filled" color="tertiary" size="small">
  Cancel
</Button>
<Button disabled={disable} onClick={upload}  variant="filled"  size="small">
  Upload
</Button>

    </div>
        </div>

    </Modal>
  );
}
