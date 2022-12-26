import { Avatar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import React, { Fragment } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Parallax as Parallax2 } from 'react-parallax';
import { styled } from '@mui/system';
import { ConnectDialogDispatcherContext, DispatcherContext } from './ConnectDialog';
import FadeIntoView from "./FadeIntoView";
import Box from '@mui/material/Box';
import ImageAvatarSelf from '../images/self.jpg'
import ImageGonzaga from '../images/gonzaga.png'
import ImageSkiingWithMom from '../images/skiing_with_mom.jpg'
import ImageStuartMt2 from '../images/stuart_mt_2.jpg'
import ImageSkiGroup2 from '../images/skigroup2.jpg'
import ImageMountDaniels from '../images/mount_daniels.jpg'
import MP4Gondola from '../images/gondola.mp4'
import ImageMe8 from '../images/me8.jpg'
import ImageClimbing from '../images/climbing.jpg'
import ImageLake from '../images/lake.jpg'
import ImageMeBackpacking from '../images/me_backpacking.jpeg'
import ImageMeSkiing from '../images/me_skiing.jpg'
import ImageMei90 from '../images/me_i90.jpg'
import ImageMeHurricaneRidge from '../images/me_hurricane_ridge.jpeg'
import ImageMeClimbingIndoor from '../images/me_indoor_climbing.jpg'
import "./Home.css"


// Example of a "styled-component" - For Reference Purposes
const Text = styled(Typography)(() => ({
    // we can define static props
    variant: "h6",
    // or we can define dynamic ones
    // size: props.size || "1em",
    display: "block",
    textAlign: "center",
    paddingLeft: ".3rem",
    paddingRight: ".3rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
}))

const Home = () => (
    <React.Fragment>
            <Parallax2
                style={{
                    height: "50vh",
                    overflow: "hidden"
                }}
                renderLayer={(percentage: number) => (
                    <div
                        style={{
                            background: `url(${ImageStuartMt2})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: "50% " + (percentage * -1000 + (800)) + "px",
                            backgroundSize: 'auto max(700px, 60vw)',
                            position: 'absolute',
                            left: '0px',
                            top: "0px",
                            width: "100%",
                            height: "50vh"
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
                    <Fragment>
                        <Avatar className="avatar" src={ImageAvatarSelf} />
                        <Text style={{ padding: ".5rem" }}><br />keep scrolling</Text>
                        <ExpandMoreIcon style={{
                            width: "100%",
                        }} />
                    </Fragment>
                </FadeIntoView>
            </Box>
            <FadeIntoView>
                <Text style={{
                    minHeight: "50vh",
                    padding: "3rem",
                }}>
                    Hi, I'm Josh!<br />
                    <br />
                A Seattle based<br />software developer/engineer<br />
                </Text>
            </FadeIntoView>
            <Parallax2
                style={{
                    height: "50vh",
                    overflow: "hidden"
                }}
                renderLayer={(percentage: number) => (
                    <div
                        style={{
                            background: `url(${ImageSkiGroup2})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: "50% " + (percentage*1.2 * -1000 + (800)) + "px",
                            backgroundSize: 'max(1150px, 100vw)',
                            position: 'absolute',
                            left: '0px',
                            top: "0px",
                            width: "100%",
                            height: "100%"
                        }}
                    />
                )}>
            </Parallax2>
            <Text style={{
                height: "25vh"
            }}>
                Need help building elegant solutions?<br />
            </Text>
            <FadeIntoView>
                <ConnectDialogDispatcherContext.Consumer>
                    {(connect: DispatcherContext | null) => (
                        <Text>Let's  <Button variant="outlined" color="primary" onClick={connect?.openConnectDialog}>Connect</Button><br /></Text>
                    )}
                </ConnectDialogDispatcherContext.Consumer>
            </FadeIntoView>
            <Parallax2
                style={{
                    height: "50vh",
                    overflow: "hidden"
                }}
                renderLayer={(percentage: number) => (
                    <div
                        style={{
                            background: `url(${ImageMountDaniels})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: "100% " + (percentage * -1000 + (500)) + "px",
                            backgroundSize: 'max(1150px, 100vw)',
                            position: 'absolute',
                            left: '0px',
                            top: "0px",
                            width: "100%",
                            height: "100%"
                        }}
                    />
                )}>
            </Parallax2>
            <Text style={{
                minHeight: "50vh",
                paddingTop: "3rem",
                paddingBottom: "3rem",
            }}>
                5+ years of professional experience,<br />
            and array of technical skills.<br />
            I have lead various cloud, back-end, and front-end efforts;<br />
            I can tackle projects with assurance.<br />
            From conception to production...<br />
            ...let's build it.<br />
            </Text>
            <FadeIntoView>
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
                        alt="Gonzaga" src={ImageGonzaga} />
                    <Text>
                        Gonzaga University Alumni<br />
                        B.S. in Computer Science<br />
                        2015
                    </Text>
                </div>
            </FadeIntoView>
            
            <Parallax2
                style={{
                    height: "75vh",
                    overflow: "hidden"
                }}
                renderLayer={(percentage: number) => (
                    <video autoPlay muted loop 
                        style={{
                            position: 'absolute',
                            left: '0px',
                            top: (percentage * -1000 + (500)) + "px",
                            width: "100%"
                        }}>
                        <source src={MP4Gondola} type="video/mp4"/>
                    </video>
                )}>
            </Parallax2>
            <Text style={{
                minHeight: "50vh",
                paddingTop: "3rem",
                paddingBottom: "3rem",
            }}>
                Above all,<br />
            teamwork is the most important competency.<br />
            I value people and partnerships,<br />
            and build work relations that are both friendly and effective.<br />
            I believe learning is collaborative,<br />
            so let's stretch our minds together.<br />
            </Text>
            <Carousel autoPlay={true} navButtonsAlwaysInvisible={true} animation="slide" duration={500}>
                <Avatar className="avatar" src={ImageSkiingWithMom} />
                <Avatar className="avatar" src={ImageClimbing} />
                <Avatar className="avatar" src={ImageLake} />
                <Avatar className="avatar" src={ImageMe8} />
                <Avatar className="avatar" src={ImageMeBackpacking} />
                <Avatar className="avatar" src={ImageMeClimbingIndoor} />
                <Avatar className="avatar" src={ImageMeHurricaneRidge} />
                <Avatar className="avatar" src={ImageMeSkiing} />
                <Avatar className="avatar" src={ImageMei90} />
            </Carousel>
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
    </React.Fragment>
);

export default Home;