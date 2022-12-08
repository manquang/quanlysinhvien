import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@mui/material";

class DialogAlertRemove extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Dialog open={this.props.open}>
          <DialogTitle>
            Xác nhận xoá:
            {" " +
              this.props.selectedItem.name +
              " - " +
              this.props.selectedItem.id}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Chắc chắn xóa ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Không đồng ý
            </Button>
            <Button onClick={this.props.handleSubmit} color="primary">
              Đồng ý
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
export default DialogAlertRemove;
