
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    fadeInSection: {
        opacity: "0",
        transform: "translateY(20vh)",
        visibility: "hidden",
        transition: "opacity 3s ease-out, transform 1.2s ease-out",
        willChange: "opacity, visibility",
      },
      isVisible: {
        opacity: "1",
        transform: "none",
        visibility: "visible",
      },
});

class FadeIntoView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isVisible: false,
      };
      this.domRef = React.createRef();
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(entry => this.setState({isVisible: entry.isIntersecting}));
    });
    }
    
    componentDidMount() {
        this.observer.observe(this.domRef.current);
        return () => this.observer.unobserve(this.domRef.current);
    }
    componentWillUnmount() {
        this.observer.unobserve(this.domRef.current);
    }
    render() {
        return (
            <div className={this.state.isVisible ? this.props.classes.fadeInSection+" "+this.props.classes.isVisible : this.props.classes.fadeInSection} ref={this.domRef}
            >
              {this.props.children}
            </div>
        );
    }
}

FadeIntoView.propTypes = {};

export default withStyles(styles)(FadeIntoView);