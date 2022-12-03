import * as React from "react";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AppContext } from "../context/Context";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AddPersonURL } from "../urls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ModalComponent() {
  const [open, setOpen] = React.useState(true);
  const [flag, setFlag] = useState(-1);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const { openModal, setOpenModal, typeModal } = useContext(AppContext);

  const handleClose = () => setOpenModal(false);

  useEffect(() => {
    let arr = typeModal.split(" ");
    if (arr[0] == "Add") setFlag(1);
    else setFlag(0);
  }, []);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const saveHandler = async () => {
    if (name.length <= 0) {
      toast.error("Name field is empty", toastOptions);
      return;
    }
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    let { data } = await axios.post(AddPersonURL, {
      name,
      phoneNumber: number,
      userId,
    });
    console.log(data);
    if (data.status) toast.success(data.msg, toastOptions);
    else toast.error(data.msg, toastOptions);
    handleClose();
  };

  return (
    <>
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <label
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              {typeModal} Here
            </label>
            <TextField
              fullWidth
              label="Name"
              type="text"
              style={{ marginBottom: "1rem" }}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              label="Phone Number"
              type="number"
              onChange={(e) => setNumber(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            {flag ? (
              <Button fullWidth variant="outlined" onClick={saveHandler}>
                Save
              </Button>
            ) : (
              <></>
            )}
            {!flag && (
              <div>
                <Button
                  fullWidth
                  variant="outlined"
                  style={{
                    borderColor: "green",
                    color: "green",
                    marginBottom: "1rem",
                  }}
                >
                  Edit
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  style={{ borderColor: "red", color: "red" }}
                >
                  Delete
                </Button>
              </div>
            )}
          </Box>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
}
