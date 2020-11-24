import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Avatar, Typography} from '@material-ui/core';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import styled from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FadeIntoView from "./reusable/FadeIntoView"
import Carousel from 'react-material-ui-carousel'
import { Parallax as Parallax2 } from 'react-parallax';



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
                            <Parallax2
                                // bgImage={process.env.PUBLIC_URL + '/images/stuart_mt_2.jpg'}
                                // bgImageAlt="the cat"
                                style={{
                                    height: "50vh",
                                    background: 'white',
                                    overflow: "hidden"
                                }}
                                renderLayer={percentage => (
                                    <div
                                        style={{
                                            // "url("./images/stuart_mt_2.jpg") 50% -6.89655% / 200% no-repeat"
                                            background: 'url(./images/stuart_mt_2.jpg)',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: "50% "+(percentage*-1000+910)+"px",
                                            backgroundSize: 'auto 1000px',
                                            position: 'absolute',
                                            // background: `rgba(255, 125, 0, ${percentage * 1})`,
                                            left: '0px',
                                            top: "0px",
                                            width: "100%",
                                            height: "100vh"//*percentage * 300,
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
                            {/* <Parallax strength={2000}>
                                <Background className="custom-bg">
                                    <div style={{
                                        height: "100vh",
                                        background: 'url(./images/stuart_mt_2.jpg)',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: "50%",
                                        backgroundSize: 'cover'}}>
                                    </div>
                                </Background>
                            </Parallax> */}
                        
                        {/* <div style={{
                            height: "50vh",
                            background: 'white',
                            overflow: "hidden"}}>
                            <Parallax y={["100", "-125"]} >
                                <div style={{
                                    height: "100vh",
                                    background: 'url(./images/stuart_mt_2.jpg)',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: "50%",
                                    backgroundSize: 'cover'}}>
                                    <FadeIntoView>
                                        <Typography variant="h3" style={{ 
                                            display: "block",
                                            textAlign: "center",
                                            padding: "4rem",
                                            color: "black", }}>welcome.</Typography>
                                    </FadeIntoView>
                                </div>f
                            </Parallax>
                        </div> */}
                        <div style={{
                            minHeight: "50vh",
                            padding: "3rem",
                            background: 'white'}}>
                            <Avatar style={{
                                width: "150px",
                                height: "150px",
                                // position: "absolute",
                                // bottom: "75px",
                                right: "calc(-50% + 75px)",
                                }} src={process.env.PUBLIC_URL + '/images/me.jpg'}/>
                            <Text style={{ }}><br/>keep scrolling</Text>
                            <ExpandMoreIcon style={{
                                width: "100%",
                            }}/>
                            {/* <IconButton><ExpandMoreIcon/></IconButton> */}
                        </div>
                        <FadeIntoView>
                            <Text style={{
                                minHeight: "50vh",}}>
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
                            <Text>Let's connect<br/></Text>
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
                                height: "50vh"}}>
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
                                height: "50vh"}}>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me7.jpg'}/>
                                <Text>Washington born and raised</Text>
                            </div>
                        </FadeIntoView>
                        <FadeIntoView >
                            <Text style={{
                                height: "50vh"}}>
                            Teamwork is my most important competency.<br/>
                            I value people and partnerships.<br/>
                            My work relations are both friendly and effective.<br/>
                            Learning is a collaborative process,<br/>
                            and mentorships are given and recieved with gratitude.<br/>
                            Let's stretch our minds together<br/>
                            </Text>
                        </FadeIntoView>
                        <div style={{
                                height: "50vh"}}>
                        <Text>Get To Know Me:</Text>
                        <Carousel>
                            <div>
                                <img style={{
                                    position: "relative",
                                    width: "150px",
                                    height: "150px",
                                    right: "calc(-50% + 75px)",
                                    }}
                                    alt="Gonzaga" src={process.env.PUBLIC_URL + '/images/gonzaga.png'}/>
                                <Text>Gonzaga Alumni</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me8.jpg'}/>
                                <Text>Cycling Gears</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/climbing.jpg'}/>
                                <Text>Climbing Cliffs</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/skiing_with_mom.jpg'}/>
                                <Text>Sking Slopes</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/groupphotohike.jpg'}/>
                                <Text>Friendly Hikes</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/me6.jpg'}/>
                                <Text>Furball Friends</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/drone.jpg'}/>
                                <Text>Drone Racing</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/hummingbird.jpg'}/>
                                <Text>Art &#38; Photography</Text>
                            </div>
                            <div>
                                <Avatar style={{
                                    width: "150px",
                                    height: "150px",
                                    // position: "absolute",
                                    // bottom: "75px",
                                    right: "calc(-50% + 75px)",
                                    }} src={process.env.PUBLIC_URL + '/images/lakedays.jpg'}/>
                                <Text>Lake Days</Text>
                            </div>
                        </Carousel>
                        </div>
                    </div>
                </ParallaxProvider>
            </React.Fragment>
        );
    }
}

Home.propTypes = {};

export default withStyles(styles)(Home);