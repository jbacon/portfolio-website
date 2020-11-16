import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {IconButton, ExpandMoreIcon} from '@material-ui/core';

const styles = theme => ({
    fadeInSection: {
        opacity: "0",
        transform: "translateY(20vh)",
        visibility: "hidden",
        transition: "opacity 6s ease-out, transform 1.2s ease-out",
        willChange: "opacity, visibility",
    },
    isVisible: {
        opacity: "1",
        transform: "none",
        visibility: "visible",
    },
});

class LoadMoreButton extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          bottomReached: false,
      };
    //   this.domRef = React.createRef();
    }
    
    handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            console.log("you're at the bottom of the page");
            this.setState({bottomReached: true})
         }
         else {
             this.setState({bottomReached: false})
         }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    render() {
        return (
            <IconButton><ExpandMoreIcon/></IconButton>
        );
    }
}

LoadMoreButton.propTypes = {};

export default withStyles(styles)(LoadMoreButton);