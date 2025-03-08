import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { Avatar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { Parallax as Parallax2 } from "react-parallax";
import ImageClimbing from "../images/climbing.jpg";
import MP4Gondola from "../images/gondola.mp4";
import ImageGonzaga from "../images/gonzaga.png";
import ImageLake from "../images/lake.jpg";
import ImageMe8 from "../images/me8.jpg";
import ImageMeBackpacking from "../images/me_backpacking.jpeg";
import ImageMeHurricaneRidge from "../images/me_hurricane_ridge.jpeg";
import ImageMei90 from "../images/me_i90.jpg";
import ImageMeClimbingIndoor from "../images/me_indoor_climbing.jpg";
import ImageMeSkiing from "../images/me_skiing.jpg";
import ImageMountDaniels from "../images/mount_daniels.jpg";
import ImageAvatarSelf from "../images/self.jpg";
import ImageSkiGroup2 from "../images/skigroup2.jpg";
import ImageSkiingWithMom from "../images/skiing_with_mom.jpg";
import ImageStuartMt2 from "../images/stuart_mt_2.jpg";
import ChatBox from "./assistant/ChatBox";
import {
  ConnectDispatcherContext,
  ConnectDispatcherStateInterface,
} from "./ConnectDialog";
import FadeIntoView from "./FadeIntoView";
import "./Home.css";

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
}));

const Home = () => (
  <>
    <Parallax2
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
      renderLayer={(percentage: number) => (
        <div
          style={{
            background: `url(${ImageStuartMt2})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `50% ${percentage * -1000 + 800}px`,
            backgroundSize: "auto max(120vh, 60vw)",
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100vh",
          }}
        />
      )}
    >
      <FadeIntoView>
        <div>
          <Text variant="h5">Welcome!</Text>
          <Avatar className="avatar" src={ImageAvatarSelf} />
          <br />
          {/* <Text style={{ padding: ".2rem" }}>
            Questions? Ask with my assistant:
          </Text> */}
          <div className="center" style={{ width: "100%" }}>
            {/* <Paper elevation={1} style={{ padding: "10px" }}> */}
            <ChatBox shouldOpenChat style={{ padding: ".2rem" }} />
            {/* </Paper> */}
          </div>
          <br />
          <Text style={{ padding: ".5rem" }}>or keep scrolling</Text>
          <ExpandMoreIcon
            style={{
              width: "100%",
            }}
          />
        </div>
      </FadeIntoView>
    </Parallax2>
    <Box
      color="primary"
      style={{
        minHeight: "50vh",
        padding: "2rem",
      }}
    >
      <FadeIntoView>
        <Text
          style={{
            minHeight: "50vh",
            padding: "3rem",
          }}
        >
          Hi, I&apos;m Josh!
          <br />
          <br />
          A Seattle based
          <br />
          software developer/engineer
          <br />
        </Text>
      </FadeIntoView>
    </Box>
    <Parallax2
      style={{
        height: "50vh",
        overflow: "hidden",
      }}
      renderLayer={(percentage: number) => (
        <div
          style={{
            background: `url(${ImageSkiGroup2})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `50% ${percentage * 1.2 * -1000 + 800}px`,
            backgroundSize: "max(1150px, 100vw)",
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100%",
          }}
        />
      )}
    ></Parallax2>
    <Text
      style={{
        height: "25vh",
      }}
    >
      Need help building elegant solutions?
      <br />
    </Text>
    <FadeIntoView>
      <ConnectDispatcherContext.Consumer>
        {(connect: ConnectDispatcherStateInterface | null) => (
          <Text>
            Let&apos;s{" "}
            <Button
              variant="outlined"
              color="primary"
              onClick={connect?.openConnectDialog}
            >
              Connect
            </Button>
            <br />
          </Text>
        )}
      </ConnectDispatcherContext.Consumer>
    </FadeIntoView>
    <Parallax2
      style={{
        height: "50vh",
        overflow: "hidden",
      }}
      renderLayer={(percentage: number) => (
        <div
          style={{
            background: `url(${ImageMountDaniels})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: `100% ${percentage * -1000 + 500}px`,
            backgroundSize: "max(1150px, 100vw)",
            position: "absolute",
            left: "0px",
            top: "0px",
            width: "100%",
            height: "100%",
          }}
        />
      )}
    ></Parallax2>
    <Text
      style={{
        minHeight: "50vh",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      5+ years of professional experience,
      <br />
      and an array of technical skills.
      <br />
      I have lead various cloud, back-end, and front-end efforts;
      <br />
      I tackle projects with assurance.
      <br />
      From conception to production...
      <br />
      ...let&apos;s build it.
      <br />
    </Text>
    <FadeIntoView>
      <div
        style={{
          minHeight: "50vh",
          padding: "3rem",
        }}
      >
        <img
          style={{
            position: "relative",
            width: "150px",
            height: "150px",
            right: "calc(-50% + 75px)",
          }}
          alt="Gonzaga"
          src={ImageGonzaga}
        />
        <Text>
          Gonzaga University Alumni
          <br />
          B.S. in Computer Science
          <br />
          2015
        </Text>
      </div>
    </FadeIntoView>

    <Parallax2
      style={{
        height: "75vh",
        overflow: "hidden",
      }}
      renderLayer={(percentage: number) => (
        <video
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            left: "0px",
            top: `${percentage * -1000 + 500}px`,
            width: "100%",
          }}
        >
          <source src={MP4Gondola} type="video/mp4" />
        </video>
      )}
    ></Parallax2>
    <Text
      style={{
        minHeight: "50vh",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      Above all,
      <br />
      teamwork is the most important competency.
      <br />
      I value people and partnerships,
      <br />
      and build work relations that are both friendly and effective.
      <br />
      Learning is most often collaborative,
      <br />
      so let&apos;s stretch our minds together.
      <br />
    </Text>
    <Carousel
      autoPlay={true}
      navButtonsAlwaysInvisible={true}
      animation="slide"
      duration={500}
    >
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
    <div
      style={{
        minHeight: "50vh",
        padding: "3rem",
      }}
    >
      <Text>Recommendations:</Text>
      <Carousel autoPlay={false} navButtonsAlwaysInvisible={true}>
        <div>
          <Text>
            <FormatQuoteIcon />
            Josh is a great employee. I&apos;ve been very impressed with his
            ability to pick up new skills as well as his attention to detail.
            Josh is also very easy to work with and is a great team player. He
            collaborates well with other to ensure a quality product is
            delivered. He has been a huge asset to the Information Delivery team
            here at Clearwater Paper during his internship. Josh is just getting
            started in his career, but I know he&apos;s going to go far.
            <FormatQuoteIcon />
            <br />
          </Text>
          <Text>Phil Peck, June 10, 2015, managed directly</Text>
        </div>
        <div>
          <Text>
            <FormatQuoteIcon />
            &apos;Tons of potential&apos; is the phrase that comes to mind when
            I think of Josh. Josh has been my intern for less than a year and
            has picked up complex technologies far quicker than I expected him
            to. He&apos;s a very quick learner and self-starter who has a great
            drive to figure things out on his own. He&apos;s going to be a
            superstar performer when he&apos;s done with college; any company
            will be lucky to have to him.
            <FormatQuoteIcon />
            <br />
          </Text>
          <Text>Kyle Stevenson, October 18, 2014, managed directly</Text>
        </div>
      </Carousel>
    </div>
  </>
);

export default Home;
