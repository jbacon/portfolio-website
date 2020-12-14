import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';
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

  handleResume = () => {
    window.open(process.env.PUBLIC_URL + '/josh_bacon_resume.pdf', "_blank")
  }
  handleConnect = () => {
    this.props.connect();
  }

  render() {
    return (
      <AppBar position='static' color="secondary">
        <Toolbar>
          <Typography noWrap><b>JOSH BACON</b> - Engineer</Typography>
          <div className={this.props.classes.grow} />
          <div className={this.props.classes.sectionDesktop}>
            <Button onClick={this.handleResume} color="inherit">Resume</Button>
            <Button onClick={this.handleConnect} color="inherit">Connect</Button>
          </div>
          <div className={this.props.classes.sectionMobile}>
            <IconButton
              color="inherit"
              aria-label="show more"
              aria-controls={this.mobileMenuId}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}>
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
          onClick={this.handleMobileMenuClose}
          onScroll={this.handleMobileMenuClose}
        >
          <MenuItem onClick={this.handleResume}>Resume</MenuItem>
          <MenuItem onClick={this.handleConnect}>Connect</MenuItem>
        </Menu>
      </AppBar>
    );
  }
}

Header.propTypes = {};

export default withConnectDialogDispatcher(withStyles(styles)(Header));