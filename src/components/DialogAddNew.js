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
      errorId: "Format hợp lệ: 8 chữ số và chưa có trong danh sách",
      errorName: "Tên không để trống",
      errorDate: "",
      newOne: {
        name: "",
        id: "",
        hometown: "",
        date: "1/1/1922",
      },
    };
  }

  onChangeId(event) {
    if (this.props.checkId(event.target.value) === 1) {
      this.setState({ errorId: "Đã có mã sinh viên này" });
    } else if (this.props.checkId(event.target.value)) {
      this.setState({ errorId: "" });
    } else {
      this.setState({ errorId: "Format hợp lệ: 8 chữ số" });
    }
    this.setState({
      newOne: { ...this.state.newOne, id: event.target.value },
    });
  }

  onChangeName(event) {
    if (this.props.checkName(event.target.value) === 1) {
      this.setState({ errorName: "Tên không để trống" });
    } else if (this.props.checkName(event.target.value)) {
      this.setState({ errorName: "Trùng tên" });
    } else {
      this.setState({ errorName: "" });
    }
    this.setState({
      newOne: { ...this.state.newOne, name: event.target.value },
    });
  }

  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>Thêm sinh viên</DialogTitle>
          <DialogContent>
            <TextField
              label="Họ và tên"
              helperText={this.state.errorName}
              margin="dense"
              autoFocus
              type="text"
              onChange={this.onChangeName.bind(this)}
              variant="outlined"
              fullWidth
              inputProps={{ maxLength: 100 }}
              required
            />
            <TextField
              label="Mã sinh viên"
              helperText={this.state.errorId}
              margin="dense"
              autoFocus
              type="text"
              onChange={this.onChangeId.bind(this)}
              variant="outlined"
              fullWidth
              required
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
                onError={(reason, value) => {
                  if (reason) {
                    this.setState({
                      errorDate: reason,
                    });
                  } else {
                    this.setState({
                      errorDate: "",
                    });
                  }
                }}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    name="date"
                    margin="dense"
                    error={this.state.errorDate ? true : false}
                    helperText={this.state.errorDate}
                  />
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
              inputProps={{ maxLength: 100 }}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              disabled={
                this.state.errorId &&
                this.state.errorName &&
                this.state.errorDate
                  ? true
                  : false
              }
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
