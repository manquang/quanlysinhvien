import "./App.css";
import { Component } from "react";
import data from "./asset/data.json";
import {
  TableHead,
  TableBody,
  Table,
  TableRow,
  TableCell,
  TableContainer,
  ButtonGroup,
  Button,
  Paper,
} from "@mui/material";
import DialogEditItem from "./components/DialogEditItem";
import DialogAlertRemove from "./components/DialogAlertRemove";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DialogAddNew from "./components/DialogAddNew";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      openEditItem: false,
      openAlertRemove: false,
      openAddNew: false,
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.setState({
      rows: data,
    });
  };

  checkId = (id) => {
    const idRegex = new RegExp("^[0-9]{8}$");
    console.log(this.state.rows.find((item) => item.id === id));
    if (this.state.rows.find((item) => item.id === id)) {
      return 1;
    } else return idRegex.test(id);
  };

  checkName = (name) => {
    if (this.state.rows.find((item) => item.name === name)) {
      return true;
    } else if (name === "") {
      return 1;
    } else return false;
  };

  handleOpenAddNew = () => {
    this.setState({
      openAddNew: true,
    });
  };

  handleClickOpen = (item) => {
    this.setState({
      openEditItem: true,
      selectedItem: item,
    });
  };

  handleDeleteItem = (item) => {
    this.setState({
      openAlertRemove: true,
      selectedItem: item,
    });
  };

  handleClose = () => {
    this.setState({
      openEditItem: false,
      openAlertRemove: false,
      openAddNew: false,
      selectedItem: null,
    });
  };

  handleChange = (event, target) => {
    this.setState({
      selectedItem: {
        ...this.state.selectedItem,
        [target]: event.target.value,
      },
    });
  };

  handleChangeDate = (newValue) => {
    this.setState({
      selectedItem: {
        ...this.state.selectedItem,
        date: newValue,
      },
    });
  };

  //Xác nhận tương ứng với các hoạt động openEditItem và openAlertRemove
  handleSubmit = (newOne) => {
    let rows = this.state.rows;
    // Edit
    if (this.state.openEditItem) {
      var objIndex = this.state.rows.findIndex(
        (obj) => obj.id === this.state.selectedItem.id
      );
      rows[objIndex] = this.state.selectedItem;
    }
    // Delete
    if (this.state.openAlertRemove) {
      rows = rows.filter((obj) => obj.id !== this.state.selectedItem.id);
    }
    console.log(newOne);
    // Add new
    if (this.state.openAddNew) {
      rows.push(newOne);
    }
    //Cập nhật rows
    this.setState({
      rows: rows,
    });

    this.handleClose();
  };

  actionsBlock = (item) => {
    return (
      <div className="actionsBlock">
        <EditIcon
          style={{ cursor: "pointer" }}
          onClick={() => this.handleClickOpen(item)}
        />
        <DeleteIcon
          style={{ cursor: "pointer" }}
          onClick={() => this.handleDeleteItem(item)}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="App">
        <ButtonGroup>
          <Button color="primary" onClick={() => this.handleOpenAddNew()}>
            Thêm sinh viên
          </Button>
        </ButtonGroup>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TT</TableCell>
                <TableCell>Mã SV</TableCell>
                <TableCell>Họ và tên</TableCell>
                <TableCell>Ngày sinh</TableCell>
                <TableCell>Quê quán</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.hometown}</TableCell>
                  <TableCell>{this.actionsBlock(row)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {this.state.openEditItem ? (
          <DialogEditItem
            open={this.state.openEditItem}
            selectedItem={this.state.selectedItem}
            checkName={this.checkName}
            handleClose={this.handleClose}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
        {this.state.openAlertRemove ? (
          <DialogAlertRemove
            open={this.state.openAlertRemove}
            selectedItem={this.state.selectedItem}
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
        {this.state.openAddNew ? (
          <DialogAddNew
            rows={this.state.rows}
            open={this.state.openAddNew}
            checkId={this.checkId}
            checkName={this.checkName}
            handleClose={this.handleClose}
            handleChange={this.handleChange}
            handleChangeDate={this.handleChangeDate}
            handleSubmit={this.handleSubmit}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
