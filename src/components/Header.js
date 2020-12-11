import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import {
  Link
} from "react-router-dom";
import { withConnectDialogDispatcher } from './ConnectDialog';

const styles = theme => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMoreAnchorEl: null,
    };
  }

  mobileMenuId = 'primary-search-account-menu-mobile';

  handleMobileMenuOpen = (event) => { this.setState({ mobileMoreAnchorEl: event.currentTarget }) };
  handleMobileMenuClose = () => { this.setState({ mobileMoreAnchorEl: null }) };

  render() {
    return (
      <AppBar position='static' color='default' style={{
        background: 'black',
        // flex: "1",
      }}>
        <Toolbar>
          <Typography noWrap
            className={this.props.classes.title}
            to='/' component={Link}
            style={{
              // flex: 1,
              color: 'white',
              textDecoration: "None",
            }}><b>JOSH BACON</b> - Engineer
                </Typography>
          <div className={this.props.classes.grow} />
          <div className={this.props.classes.sectionDesktop}>
            <Button href={process.env.PUBLIC_URL + '/josh_bacon_resume.pdf'} download target="_blank" style={{ color: 'white' }}>Resume</Button>
            <Button style={{ color: "white" }} onClick={this.props.connect}>Connect</Button>
          </div>
          <div className={this.props.classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={this.mobileMenuId}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
              style={{
                flexGrow: 1,
                color: 'white'
              }}
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Menu
          anchorEl={this.state.mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={this.mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(this.state.mobileMoreAnchorEl)}
          onClose={this.handleMobileMenuClose}
        >
          <MenuItem onClick={this.handleMobileMenuClose}>
            <Button href={process.env.PUBLIC_URL + '/josh_bacon_resume.pdf'} download target="_blank" style={{ color: 'black' }}>Resume</Button>
          </MenuItem>
          <MenuItem onClick={this.handleMobileMenuClose}>
            <Button style={{ color: "black" }} onClick={this.props.connect}>Connect</Button>
          </MenuItem>
        </Menu>
      </AppBar>
    );
  }
}

Header.propTypes = {};

export default withConnectDialogDispatcher(withStyles(styles)(Header));