import React from 'react';
import './App.css';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MoreIcon from '@material-ui/icons/MoreVert';
import { ThemeProvider, withTheme, createMuiTheme, AppBar, Menu, IconButton, MenuItem, Button, CssBaseline, Toolbar, Typography, Tabs, Tab, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./components/pages/Home"
import Connect from "./components/pages/Connect"

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
  title: {
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileMoreAnchorEl: null,
    };
  }
  handleChange = (event, value) => {};
  
  handleMobileMenuOpen = (event) => {
    this.setState({mobileMoreAnchorEl: event.currentTarget});
  };
  handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl: null});
  };
  componentDidMount() {
  }

  componentWillUnmount() {
  }

  mobileMenuId = 'primary-search-account-menu-mobile';

  render() {
    return (
      <React.Fragment>
        <CssBaseline/>
        <Router>
        <div style={{
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
            justifyContent: "space-between",
        }}>
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
                  <Connect style={{ color: "white" }}></Connect>
                  {/* <Button to='/connect' component={Link} style={{ color: 'white' }}>Connect</Button> */}
                </div>
                <div className={this.props.classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={this.mobileMenuId}
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    style={{
                      flexGrow: 1,
                      color: 'white' }}
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
                <MenuItem>
                  <Button href={process.env.PUBLIC_URL + '/josh_bacon_resume.pdf'} download target="_blank" style={{ color: 'black' }}>Resume</Button>
                </MenuItem>
                <MenuItem>
                  <Connect style={{ color: "black"}}></Connect>
                </MenuItem>
              </Menu>
            </AppBar>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
            <BottomNavigation style={{ background: 'black' }}>
              {/* <div className={this.props.classes.grow} /> */}
              <BottomNavigationAction  style={{ flex: 0 }} href="https://github.com/jbacon" target="_blank" label="GitHub" icon={
                <GitHubIcon fontSize="large" style={{ color: "white" }}/>
              }/>
              <BottomNavigationAction  style={{ flex: 0 }} selected href="https://github.com/jbacon" target="_blank" label="LinkedIn" icon={
                <LinkedInIcon fontSize="large" style={{ color: "white"}}/>
              }/>
              {/* <div className={this.props.classes.grow} /> */}
              <a href="https://reactjs.org/" target="_blank" style={{
                  flex: "0 1 0%",
                  height: "100%",
                }}>
                <img style={{
                  height: "100%",
                  padding: "8px",
                }}
                alt="Made With ReactJS" src={process.env.PUBLIC_URL + '/images/poweredwithreactjs.png'}/>
              </a>
          </BottomNavigation>
        </div>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {};

export default withStyles(styles)(App);
