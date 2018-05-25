import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import SettingsDialog from './SettingsDialog.js';
import './customStyles.css';
import ProfileDialog from './ProfileDialog'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: theme.spacing.unit,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
   // marginRight: theme.spacing.unit,
  },
});

function LitAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color={props.settings.appBarColorPrimary ? "primary" : "secondary"}
      >
        <Toolbar style={{'background': 'transparent'}}>
        </Toolbar>
      </AppBar>

      <AppBar
        position="fixed"
        color={props.settings.appBarColorPrimary ? "primary" : "secondary"}
      >
        <Toolbar style={{'background': 'black'}}>
          <Typography variant="title" color="inherit" className={classes.flex} style={{'font-family': 'Architects Daughter, cursive'}}>
            lit - Lightning Network Node software
          </Typography>
          <ProfileDialog
            settings={props.settings}
            address={props.address}
            />
        <SettingsDialog
          settings={props.settings}
          handleSettingsSubmit={props.handleSettingsSubmit}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

LitAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  handleSettingsSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(LitAppBar);
