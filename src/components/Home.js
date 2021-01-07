import { Avatar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Parallax as Parallax2 } from 'react-parallax';
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';
import styled from 'styled-components';
import { ConnectDialogDispatcherContext } from './ConnectDialog';
import FadeIntoView from "./FadeIntoView";
import Box from '@material-ui/core/Box';


// Example of a "styled-component" - For Reference Purposes
const Text = styled(Typography).attrs(props => ({
    // we can define static props
    variant: "h6",
    // or we can define dynamic ones
    // size: props.size || "1em",
}))`
  display: block;
  text-align: center;
  padding-left: .3rem;
  padding-right: .3rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
//   position: absolute;
//   top: 0;
`;

const Home = (props) => (
    <React.Fragment>
        <ParallaxProvider>
                <Parallax2
                    style={{
                        height: "50vh",
                        overflow: "hidden"
                    }}
                    renderLayer={percentage => (
                        <div
                            style={{
                                background: 'url(./images/stuart_mt_2.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: "50% " + (percentage * -1000 + (800)) + "px",
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
                            padding: "4rem"
                        }}>welcome.</Typography>
                    </FadeIntoView>
                </Parallax2>
                <Box color="primary" style={{
                    minHeight: "50vh",
                    padding: "2rem",
                }}>
                    <FadeIntoView>
                    <Avatar style={{
                        width: "180px",
                        height: "180px",
                        right: "calc(-50% + 90px)",
                    }} src={process.env.PUBLIC_URL + '/images/self.jpg'} />
                    <Text style={{ padding: ".5rem" }}><br />keep scrolling</Text>
                    <ExpandMoreIcon style={{
                        width: "100%",
                    }} />
                    </FadeIntoView>
                </Box>
                <FadeIntoView>
                    <Text style={{
                        minHeight: "50vh",
                        padding: "3rem",
                    }}>
                        Hi, I'm Josh!<br />
                        <br />
                    Seattle based,<br />software developer/engineer<br />
                    </Text>
                </FadeIntoView>
                <div style={{
                    height: "50vh",
                    overflow: "hidden"
                }}>
                    <Parallax y={["570px", "-720px"]} >
                        <div style={{
                            height: "100vh",
                            background: 'url(./images/skigroup2.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: "100%",
                            backgroundSize: 'cover'
                        }} />
                    </Parallax>
                </div>
                <Text style={{
                    height: "25vh"
                }}>
                    Need help building elegant solutions?<br />
                </Text>
                <FadeIntoView style={{
                    height: "25vh"
                }}>
                    <ConnectDialogDispatcherContext.Consumer>
                        {connect => (
                            <Text>Let's  <Button variant="outlined" color="primary" onClick={connect}>Connect</Button><br /></Text>
                        )}
                    </ConnectDialogDispatcherContext.Consumer>
                </FadeIntoView>
                <div style={{
                    height: "50vh",
                    overflow: "hidden"
                }}>
                    <Parallax y={["570px", "-720px"]} >
                        <div style={{
                            height: "100vh",
                            background: 'url(./images/colchuck_hike.jpg)',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: "50%",
                            backgroundSize: 'cover'
                        }} />
                    </Parallax>
                </div>
                <FadeIntoView>
                    <Text style={{
                        minHeight: "50vh",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                    }}>
                        5+ years professional experience.<br />
                    I have an array of technical skills;<br />
                    Lead various cloud, back-end, and front-end efforts;<br />
                    And tackle projects with assurance.<br />
                    From conception to production...<br />
                    ...let's build it.<br />
                    </Text>
                </FadeIntoView>
                    <div style={{
                        minHeight: "50vh",
                        padding: "3rem",
                    }}>
                        <img style={{
                            position: "relative",
                            width: "150px",
                            height: "150px",
                            right: "calc(-50% + 75px)",
                        }}
                            alt="Gonzaga" src={process.env.PUBLIC_URL + '/images/gonzaga.png'} />
                        <Text>
                            Gonzaga University Alumni<br />
                            B.S. in Computer Science<br />
                            2015
                        </Text>
                    </div>
                <FadeIntoView >
                    <Text style={{
                        minHeight: "50vh",
                        paddingTop: "3rem",
                        paddingBottom: "3rem",
                    }}>
                        Above all,<br />
                    teamwork is the most important competency.<br />
                    I value people and partnerships,<br />
                    and build work relations are both friendly and effective.<br />
                    I believe learning is collaborative,<br />
                    so let's stretch our minds together.<br />
                    </Text>
                </FadeIntoView>
                <Avatar style={{
                    width: "180px",
                    height: "180px",
                    right: "calc(-50% + 90px)",
                }} src={process.env.PUBLIC_URL + '/images/skiing_with_mom.jpg'} />
                <div style={{
                    minHeight: "50vh",
                    padding: "3rem",
                }}>
                    <Text>Recommendations:</Text>
                    <Carousel autoPlay={false} navButtonsAlwaysInvisible={true}>
                        <div>
                            <Text><FormatQuoteIcon />Josh is a great employee. I've been very impressed with his ability to pick up new skills as well as his attention to detail. Josh is also very easy to work with and is a great team player. He collaborates well with other to ensure a quality product is delivered. He has been a huge asset to the Information Delivery team here at Clearwater Paper during his internship. Josh is just getting started in his career, but I know he's going to go far.<FormatQuoteIcon /><br /></Text>
                            <Text>Phil Peck, June 10, 2015, managed directly</Text>
                        </div>
                        <div>
                            <Text><FormatQuoteIcon />'Tons of potential' is the phrase that comes to mind when I think of Josh. Josh has been my intern for less than a year and has picked up complex technologies far quicker than I expected him to. He's a very quick learner and self-starter who has a great drive to figure things out on his own. He's going to be a superstar performer when he's done with college; any company will be lucky to have to him.<FormatQuoteIcon /><br /></Text>
                            <Text>Kyle Stevenson, October 18, 2014, managed directly</Text>
                        </div>
                    </Carousel>
                </div>
        </ParallaxProvider>
    </React.Fragment>
);

export default Home;