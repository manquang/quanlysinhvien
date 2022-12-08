import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  DesktopDatePicker,
  LocalizationProvider,
  // AdapterMoment,
} from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

class DialogAddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOne: {
        name: "",
        id: "",
        hometown: "",
        date: "",
      },
    };
  }
  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Thêm sinh viên</DialogTitle>
          <DialogContent>
            <TextField
              label="Họ và tên"
              margin="dense"
              autoFocus
              type="text"
              value={this.state.newOne.name}
              onChange={(event) =>
                this.setState({
                  newOne: { ...this.state.newOne, name: event.target.value },
                })
              }
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              label="Mã sinh viên"
              margin="dense"
              autoFocus
              type="text"
              value={this.state.newOne.id}
              onChange={(event) =>
                this.setState({
                  newOne: { ...this.state.newOne, id: event.target.value },
                })
              }
              variant="outlined"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Ngày sinh"
                inputFormat="DD/MM/YYYY"
                value={moment(this.state.newOne.date, "DD/MM/YYYY")}
                minDate={moment("1/1/1922", "DD/MM/YYYY")}
                onChange={(newValue) => {
                  this.setState({
                    newOne: {
                      ...this.state.newOne,
                      date: moment(newValue).format("DD/MM/YYYY"),
                    },
                  });
                }}
                renderInput={(props) => (
                  <TextField {...props} name="date" margin="dense" />
                )}
              />
            </LocalizationProvider>
            <TextField
              label="Quê quán"
              margin="dense"
              autoFocus
              value={this.state.newOne.hometown}
              type="text"
              onChange={(event) =>
                this.setState({
                  newOne: {
                    ...this.state.newOne,
                    hometown: event.target.value,
                  },
                })
              }
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => this.props.handleSubmit(this.state.newOne)}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default DialogAddNew;
