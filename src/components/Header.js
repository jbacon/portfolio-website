import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { withConnectDialogDispatcher } from './ConnectDialog';
import {
  Link,
} from "react-router-dom";
import { BlogMenu } from './Blog';

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
      isBlogDrawerOpen: false,
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
  openBlogDrawer = () => {
    this.setState({ isBlogDrawerOpen: true })
  };
  closeBlogDrawer = () => {
    this.setState({ isBlogDrawerOpen: false })
  }

  render() {
    return (
      <AppBar position='static' color="default">
        <Toolbar>
          <Button component={Link} to="/"><b>JOSH BACON</b> - Engineer</Button>
          <div className={this.props.classes.grow} />
          <div className={this.props.classes.sectionDesktop}>
            <Button onClick={this.handleResume} color="inherit">Resume</Button>
            <Button onClick={this.handleConnect} color="inherit">Connect</Button>
            <Button component={Link} to="/about" color="inherit" style={{ display: "none" }}>About</Button>
            <Button onClick={this.openBlogDrawer} color="inherit">Blog</Button>
          </div>
          <div className={this.props.classes.sectionMobile}>
            <IconButton
              color="inherit"
              aria-label="show more"
              aria-controls={this.mobileMenuId}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}>
              <MenuIcon />
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
          <MenuItem component={Link} to="/about" style={{ display: "none" }} >About</MenuItem>
          <MenuItem onClick={this.openBlogDrawer} >Blog</MenuItem>
        </Menu>
        <BlogMenu open={this.state.isBlogDrawerOpen} onClose={this.closeBlogDrawer}/>
      </AppBar>
    );
  }
}

Header.propTypes = {};

export default withConnectDialogDispatcher(withStyles(styles)(Header));