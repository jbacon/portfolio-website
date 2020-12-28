import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { withConnectDialogDispatcher } from './ConnectDialog';
import {
  Link,
} from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
          <MenuItem component={Link} to="/about" style={{ display: "none" }} >About</MenuItem>
          <MenuItem onClick={this.openBlogDrawer} >Blog</MenuItem>
        </Menu>
        <Drawer anchor="right" open={this.state.isBlogDrawerOpen} onClose={this.closeBlogDrawer}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
            <IconButton onClick={this.closeBlogDrawer}><ChevronRightIcon /></IconButton>
          </div>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
              <Typography>2020</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button component={Link} onClick={this.closeBlogDrawer} to="/blog">
                  <ListItemText primary="Article 3" />
                </ListItem>
                <ListItem button component={Link} onClick={this.closeBlogDrawer} to="/blog">
                  <ListItemText primary="Article 4" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} >
              <Typography>2015</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button component={Link} onClick={this.closeBlogDrawer} to="/blog/2015/ANarrativeOnWebApplications">
                  <ListItemText primary="A Narrative On Web App Technology" />
                </ListItem>
                <ListItem button component={Link} onClick={this.closeBlogDrawer} to="/blog/2015/MultiPageVsSinglePageApplications">
                  <ListItemText primary="Multi-Page vs Single-Page Applications" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Drawer>
      </AppBar>
    );
  }
}

Header.propTypes = {};

export default withConnectDialogDispatcher(withStyles(styles)(Header));