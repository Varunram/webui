/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles/index";
import IconButton from 'material-ui/IconButton';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import Blockies from 'react-blockies';
import Avatar from 'material-ui/Avatar';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from 'material-ui/Dialog';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import PopUpDialog from './PopUpDialog.js'

const styles = theme => ({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});


class ProfileDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        settings: props.settings,
        address: props.address
      });
  }

  handleSubmit() {
    this.props.handleSettingsSubmit(this.state.settings);
    super.handleSubmit();
  };

  // overrides PopUpDialog.handleChange
  handleChange(name) {
    return (event => {
      let settings = Object.assign({}, this.state.settings);
      settings[name] = event.target.value;
      this.setState({settings: settings});
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <IconButton
          color="inherit"
          aria-label="Menu"
          onClick={this.handleClickOpen.bind(this)}
        >
        <Avatar className={classes.avatar}>
          <Blockies
            seed={this.props.address}
            size={10}
            scale={3}
            color="#FF5733"
            bgColor="#FFC300"
          />
        </Avatar>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Your Node Info</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Use this ID to connect with other peers on the Lightning network.
              <hr />
              Your lit Node ID is
            </DialogContentText>
            <DialogContentText style={{'font-family': 'Overpass, monospace, sans-serif'}}>
              {this.props.address}
              <CopyToClipboard text={this.props.address} style={{color: 'black'}}>
                <Button>Copy</Button>
              </CopyToClipboard>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ProfileDialog.propTypes = {
  address: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProfileDialog);
