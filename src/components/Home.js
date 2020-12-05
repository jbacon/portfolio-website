import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Avatar, Typography} from '@material-ui/core';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FadeIntoView from "./reusable/FadeIntoView"
import Carousel from 'react-material-ui-carousel'
import { Parallax as Parallax2 } from 'react-parallax';
import Button from '@material-ui/core/Button';
import AppContext from '../AppContext'
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';


// Example of a "styled-component"
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
    static contextType = AppContext;
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
                            flexDirection: "column",
                        }}>
                            <Parallax2
                                style={{
                                    height: "50vh",
                                    background: 'white',
                                    overflow: "hidden"
                                }}
                                renderLayer={percentage => (
                                    <div
                                        style={{
                                            background: 'url(./images/stuart_mt_2.jpg)',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: "50% "+(percentage*-1000+(800))+"px",
                                            backgroundSize: 'auto 1000px',
                                            position: 'absolute',
                                            left: '0px',
                                            top: "0px",
                                            width: "100%",
                                            height: "100vh"
                                        }}
                                    />
                                )}>
                                <FadeIntoView>
                                    <Typography variant="h3" style={{ 
                                        display: "block",
                                        textAlign: "center",
                                        padding: "4rem",
                                        color: "black", }}>welcome.</Typography>
                                </FadeIntoView>
                            </Parallax2>
                        <div style={{
                            minHeight: "50vh",
                            padding: "3rem",
                            background: 'white'}}>
                            <Avatar style={{
                                width: "150px",
                                height: "150px",
                                right: "calc(-50% + 75px)",
                                }} src={process.env.PUBLIC_URL + '/images/self.jpg'}/>
                            <Text style={{ }}><br/>keep scrolling</Text>
                            <ExpandMoreIcon style={{
                                width: "100%",
                            }}/>
                        </div>
                        <FadeIntoView>
                            <Text style={{
                                minHeight: "50vh",
                                padding: "3rem",}}>
                            Hi, I'm Josh!<br/>
                            <br/>
                            Seattle based, software developer/engineer<br />
                            </Text>
                        </FadeIntoView>
                        <div style={{
                            height: "50vh",
                            overflow: "hidden"}}>
                            <Parallax y={["570px", "-720px"]} >
                            <div style={{
                                height: "100vh",
                                background: 'url(./images/skigroup2.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "100%",
                                backgroundSize: 'cover'}}/>
                            </Parallax>
                        </div>
                        <Text style={{
                                height: "25vh"}}>
                        Need help building elegant solutions?<br/>
                        </Text>
                        <FadeIntoView style={{
                                height: "25vh"}}>
                            <Text>Let's  <Button variant="outlined" onClick={this.context.openConnectDialog}>Connect</Button><br/></Text>
                        </FadeIntoView>
                        <div style={{
                            height: "50vh",
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
                            <Text style={{
                                minHeight: "50vh",
                                padding: "3rem",}}>
                            5+ years experience developing software.<br/>
                            I have an array of technical skills;<br/>
                            Lead various cloud, back-end, and front-end efforts;<br/>
                            I tackle projects with assurance.<br/>
                            From conception to production...<br/>
                            ...let's build it.<br/>
                            </Text>
                        </FadeIntoView>
                        <FadeIntoView>
                            <div style={{
                                minHeight: "50vh",
                                padding: "3rem",}}>
                                <img style={{
                                    position: "relative",
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }}
                                    alt="Gonzaga" src={process.env.PUBLIC_URL + '/images/gonzaga.png'}/>
                                <Text>
                                    Gonzaga University Alumni<br/>
                                    B.S. in Computer Science<br/>
                                    2015
                                </Text>
                            </div>
                        </FadeIntoView>
                        <FadeIntoView >
                            <Text style={{
                                minHeight: "50vh",
                                padding: "3rem",}}>
                            Teamwork is the most important competency.<br/>
                            I value people and my partnerships.<br/>
                            Learning is collaborative,<br/>
                            and my work relations are both friendly and effective.<br/>
                            Let's stretch our minds together...<br/>
                            </Text>
                        </FadeIntoView>
                        <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/skiing_with_mom.jpg'}/>
                        <div style={{
                                minHeight: "50vh",
                                padding: "3rem",}}>
                                    <Text>Recommendations:</Text>
                        <Carousel>
                            <div>
                                <Text><FormatQuoteIcon/>Josh is a great employee. I've been very impressed with his ability to pick up new skills as well as his attention to detail. Josh is also very easy to work with and is a great team player. He collaborates well with other to ensure a quality product is delivered. He has been a huge asset to the Information Delivery team here at Clearwater Paper during his internship. Josh is just getting started in his career, but I know he's going to go far.<FormatQuoteIcon/><br/></Text>
                                <Text>Phil Peck, June 10, 2015, managed directly</Text>
                            </div>
                            <div>
                                <Text><FormatQuoteIcon/>'Tons of potential' is the phrase that comes to mind when I think of Josh. Josh has been my intern for less than a year and has picked up complex technologies far quicker than I expected him to. He's a very quick learner and self-starter who has a great drive to figure things out on his own. He's going to be a superstar performer when he's done with college; any company will be lucky to have to him.<FormatQuoteIcon/><br/></Text>
                                <Text>Kyle Stevension, October 18, 2014, managed directly</Text>
                            </div>
                        </Carousel>
                        {/* <Text>Get To Know Me:</Text>
                        <Carousel>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me7.jpg'}/>
                                <Text>Washington born and raised</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me8.jpg'}/>
                                <Text>Cycling Gears</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/climbing.jpg'}/>
                                <Text>Climbing Cliffs</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/skiing_with_mom.jpg'}/>
                                <Text>Skiing Slopes</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/groupphotohike.jpg'}/>
                                <Text>Friendly Hikes</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me6.jpg'}/>
                                <Text>Furball Friends</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/drone.jpg'}/>
                                <Text>Drone Racing</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/hummingbird.jpg'}/>
                                <Text>Art &#38; Photography</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/lakedays.jpg'}/>
                                <Text>Lake Days</Text>
                            </div>
                        </Carousel> */}
                        </div>
                    </div>
                </ParallaxProvider>
            </React.Fragment>
        );
    }
}

Home.propTypes = {};

export default withStyles(styles)(Home);