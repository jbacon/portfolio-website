import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react';

const styles = theme => ({});

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BottomNavigation style={{  background: "black", overflow: "hidden" }}>
        <BottomNavigationAction style={{ flex: 0 }} href="https://github.com/jbacon" target="_blank" label="GitHub" icon={
          <GitHubIcon fontSize="large" color="primary"/>
        } />
        <BottomNavigationAction style={{ flex: 0 }} href="https://www.linkedin.com/in/jbacon47/" target="_blank" label="LinkedIn" icon={
          <LinkedInIcon fontSize="large" color="primary"/>
        } />
        <BottomNavigationAction style={{ flex: 1 }} href="https://github.com/jbacon/portfolio-website/" target="_blank" label="Website Source" icon={
          <img style={{
            width: "100%",
            padding: "1rem",
          }} alt="Made With ReactJS" src={process.env.PUBLIC_URL + '/images/poweredwithreactjs.png'} />
        } />
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {};

export default withStyles(styles)(Footer);