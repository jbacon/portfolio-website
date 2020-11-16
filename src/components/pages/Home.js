import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Avatar, Typography} from '@material-ui/core';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FadeIntoView from "./../reusable/FadeIntoView"


const Text = styled(Typography).attrs(props => ({
    // we can define static props
    variant: "h6",
    // or we can define dynamic ones
    // size: props.size || "1em",
  }))`
  display: block;
  text-align: center;
  color: black;
  padding: 1rem;
//   position: absolute;
//   top: 0;

`;

const styles = theme => ({
});

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    handleChange = (event, value) => {};
    render() {
        return (
            <React.Fragment>
                <ParallaxProvider>
                    <div style={{
                            background: "white",
                            justifyContent: "center",
                            display: "flex",
                            flexGrow: "1",
                            // flex: "1 0 100%",
                            // flexWrap: "nowrap",
                            // alignItems: "stretch",
                            flexDirection: "column",
                        }}>
                        <div style={{
                            height: "50vh",
                            background: 'white',
                            overflow: "hidden"}}>
                            <Parallax y={["100", "-120"]} >
                            <div style={{
                                height: "100vh",
                                background: 'url(./images/stuart_mt_2.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "50%",
                                backgroundSize: 'cover'}}>
                                <Typography variant="h3" style={{ 
                                    display: "block",
                                    textAlign: "center",
                                    padding: "4rem",
                                    color: "black", }}>welcome.</Typography></div>
                            </Parallax>
                        </div>
                        <div style={{
                            height: "50vh",
                            padding: "3rem",
                            background: 'white'}}>
                            <Avatar style={{
                                width: "150px",
                                height: "150px",
                                // position: "absolute",
                                // bottom: "75px",
                                right: "calc(-50% + 75px)",
                                }} src={process.env.PUBLIC_URL + '/images/me.jpg'}/>
                            <Text style={{ }}><br/>keep scrolling.</Text>
                            <ExpandMoreIcon style={{
                                width: "100%",
                            }}/>
                            {/* <IconButton><ExpandMoreIcon/></IconButton> */}
                        </div>
                        <FadeIntoView>
                            <Text>
                            Hi, I'm Josh,<br/>
                            <br/>
                            Seattle based and dev friendly<br />
                            </Text>
                        </FadeIntoView>
                        <div style={{
                            height: "50vh",
                            background: 'white',
                            overflow: "hidden"}}>
                            <Parallax y={["570px", "-720px"]} >
                            <div style={{
                                height: "100vh",
                                background: 'url(./images/skigroup2.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "50%",
                                backgroundSize: 'cover'}}/>
                            </Parallax>
                        </div>
                        <FadeIntoView>
                            <Text>
                            Do you need help building elegant software?<br/>
                            <br/>
                            Let's connect<br/>
                            </Text>
                        </FadeIntoView>
                        <div style={{
                            height: "50vh",
                            background: 'white',
                            overflow: "hidden"}}>
                            <Parallax y={["570px", "-720px"]} >
                            <div style={{
                                height: "100vh",
                                background: 'url(./images/colchuck_hike.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "50%",
                                backgroundSize: 'cover'}}/>
                            </Parallax>
                        </div>
                        <FadeIntoView>
                            <Text>
                            5+ years experience in software development.<br/>
                            I've collected an array of technical skills;<br/>
                            Lead various cloud, back-end, and front-end efforts;<br/>
                            And tackle projects with assurance.<br/>
                            From conception to production, let's build it.<br/>
                            </Text>
                        </FadeIntoView>
                        <Parallax x={["150", "-150"]} >
                            <Avatar style={{
                                width: "150px",
                                height: "150px",
                                // position: "absolute",
                                // bottom: "75px",
                                right: "calc(-50% + 75px)",
                                }} src={process.env.PUBLIC_URL + '/images/me7.jpg'}/>
                            <Text>Washington born and raised</Text>
                        </Parallax>
                        <FadeIntoView>
                            <Text>
                            Teamwork is the most important competency.<br/>
                            My work is done in partnership with my peers.<br/>
                            I value people, and form working relationships that are both friendly and effective.<br/>
                            Let's collaborate, stretch our minds, and share ideas!<br/>
                            </Text>
                        </FadeIntoView>
                        <div style={{
                            display: "flex",
                            flexDirection:"row",
                            justifyContent: "center",
                        }}>
                            <div style={{
                                flex: 1,
                            }}>
                            <Parallax y={["200px", "-300px"]} >
                                <Avatar style={{
                                    width: "100px",
                                    height: "100px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 50px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me8.jpg'}/>
                                <Text>Cycling<br/>Gears</Text>
                            </Parallax>
                            </div>
                            <div style={{
                                flex: 1,
                            }}>
                            <Parallax y={["100px", "-150px"]} >
                                <Avatar style={{
                                    width: "100px",
                                    height: "100px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 50px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me5.jpg'}/>
                                <Text>Climbing<br/>Rocks</Text>
                            </Parallax>
                            </div>
                            <div style={{
                                flex: 1,
                            }}>
                            <Parallax y={["200px", "-300px"]} >
                                <Avatar style={{
                                    width: "100px",
                                    height: "100px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 50px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me6.jpg'}/>
                                <Text>Furry<br/>Friends</Text>
                            </Parallax>
                            </div>
                        </div>
                        <Text><br/>Come Again!</Text>
                    </div>
                </ParallaxProvider>
            </React.Fragment>
        );
    }
}

Home.propTypes = {};

export default withStyles(styles)(Home);