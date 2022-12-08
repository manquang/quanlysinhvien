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

class DialogEditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          // handleClose={handleClose}
          // onUpdateSuccess={handleUpdateDataSuccess}
        >
          <DialogTitle>
            Edit:{" "}
            {this.props.selectedItem &&
              `${this.props.selectedItem.name} - ${this.props.selectedItem.id}`}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Họ và tên"
              margin="dense"
              autoFocus
              type="text"
              value={this.props.selectedItem.name}
              onChange={(event) => this.props.handleChange(event, "name")}
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              disabled
              label="Mã sinh viên"
              margin="dense"
              autoFocus
              type="text"
              defaultValue={this.props.selectedItem.id}
              variant="outlined"
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Ngày sinh"
                inputFormat="DD/MM/YYYY"
                value={moment(this.props.selectedItem.date, "DD/MM/YYYY")}
                minDate={moment("1/1/1922", "DD/MM/YYYY")}
                onChange={(newValue) => {
                  this.props.handleChangeDate(
                    moment(newValue).format("DD/MM/YYYY")
                  );
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
              type="text"
              value={this.props.selectedItem.hometown}
              onChange={(event) => this.props.handleChange(event, "hometown")}
              variant="outlined"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.props.handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default DialogEditItem;
