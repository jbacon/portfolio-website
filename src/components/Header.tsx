import { WithAuth0Props, withAuth0 } from "@auth0/auth0-react";
import EmailIcon from "@mui/icons-material/Email";
import MenuIcon from "@mui/icons-material/Menu";
import SmartToyTwoToneIcon from "@mui/icons-material/SmartToyTwoTone";
import {
  AppBar,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Zoom,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BlogMenu } from "./Blog";
import { ConnectDispatcherContext } from "./ConnectDialog";
import { ChatDispatcherContext } from "./assistant/Dispatcher";

interface HeaderProps extends WithAuth0Props {
  className?: string;
}

interface HeaderState {
  mobileMoreAnchorEl: Element | null;
  isBlogDrawerOpen: boolean;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const connectDispatcherContext = useContext(ConnectDispatcherContext);
  if (connectDispatcherContext === null) {
    throw new Error(
      "Header must be used within a ConnectDispatcherContext.Provider"
    );
  }

  const chatDispatcherContext = useContext(ChatDispatcherContext);
  if (chatDispatcherContext === null) {
    throw new Error("Header must be used within a ChatDispatcher.Provider");
  }

  const [state, setState] = useState<HeaderState>({
    mobileMoreAnchorEl: null,
    isBlogDrawerOpen: false,
  });

  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleMobileMenuOpen = (event: React.MouseEvent) => {
    setState((prev) => ({ ...prev, mobileMoreAnchorEl: event.currentTarget }));
  };

  const handleMobileMenuClose = () => {
    setState((prev) => ({ ...prev, mobileMoreAnchorEl: null }));
  };

  const handleResume = () => {
    window.open(process.env.PUBLIC_URL + "/josh_bacon_resume.pdf", "_blank");
  };

  const openBlogDrawer = () => {
    setState((prev) => ({ ...prev, isBlogDrawerOpen: true }));
  };

  const closeBlogDrawer = () => {
    setState((prev) => ({ ...prev, isBlogDrawerOpen: false }));
  };

  const signOut = () => {
    props.auth0
      ?.logout({
        logoutParams: {
          returnTo: window.location.origin + "/signout",
        },
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <AppBar position="static" color="default" className={props.className}>
      <Toolbar>
        <Button component={Link} to="/">
          JOSH BACON - Engineer
        </Button>
        <div className="grow" />
        {props.auth0?.isAuthenticated && (
          <Typography>Hi, {props.auth0?.user?.name}</Typography>
        )}
        <div className="sectionDesktop">
          <Button
            onClick={connectDispatcherContext.openConnectDialog}
            color="inherit"
          >
            Connect
          </Button>
          <Button onClick={handleResume} color="inherit">
            Resume
          </Button>
          <Button
            component={Link}
            to="/about"
            color="inherit"
            style={{ display: "none" }}
          >
            About
          </Button>
          <Button
            onClick={() => chatDispatcherContext.openChat()}
            color="inherit"
            style={{ display: "none" }}
          >
            ChatBot
          </Button>
          <Button onClick={openBlogDrawer} color="inherit">
            Blog
          </Button>
          {props.auth0?.isAuthenticated && (
            <Button onClick={signOut} color="inherit">
              Sign Out
            </Button>
          )}
        </div>
        <div className="sectionMobile">
          <IconButton
            color="inherit"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
      <Menu
        anchorEl={state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(state.mobileMoreAnchorEl)}
        onClose={handleMobileMenuClose}
        onClick={handleMobileMenuClose}
        onScroll={handleMobileMenuClose}
      >
        <MenuItem onClick={handleResume}>Resume</MenuItem>
        <MenuItem component={Link} to="/about" style={{ display: "none" }}>
          About
        </MenuItem>
        <MenuItem onClick={openBlogDrawer}>Blog</MenuItem>
        <MenuItem onClick={connectDispatcherContext?.openConnectDialog}>
          Connect
        </MenuItem>
        <MenuItem
          onClick={() => chatDispatcherContext?.openChat()}
          style={{ display: "none" }}
        >
          ChatBot
        </MenuItem>
        {props.auth0?.isAuthenticated && (
          <MenuItem onClick={signOut}>Sign Out</MenuItem>
        )}
      </Menu>
      <BlogMenu open={state.isBlogDrawerOpen} onClose={closeBlogDrawer} />
      <Zoom
        timeout={500}
        in={true}
        mountOnEnter
        unmountOnExit
        style={{
          transitionDelay: `2000ms`,
        }}
      >
        <Fab
          color="primary"
          aria-label="add"
          style={{
            position: "fixed",
            bottom: 16,
            right: 16,
          }}
          onClick={connectDispatcherContext?.openConnectDialog}
        >
          <EmailIcon />
        </Fab>
      </Zoom>
      <Zoom
        timeout={500}
        in={true}
        mountOnEnter
        unmountOnExit
        style={{
          transitionDelay: `2000ms`,
        }}
      >
        <Fab
          color="primary"
          aria-label="chat"
          style={{
            position: "fixed",
            bottom: 85,
            right: 16,
          }}
          onClick={() => {
            chatDispatcherContext?.openChat();
          }}
        >
          <SmartToyTwoToneIcon />
        </Fab>
      </Zoom>
    </AppBar>
  );
};

export default withAuth0(styled(Header)<HeaderProps>`
  .sectionDesktop {
    display: none;
    ${(p) => p.theme.breakpoints.up("sm")} {
      display: flex;
    }
  }
  .sectionMobile {
    display: flex;
    ${(p) => p.theme.breakpoints.up("sm")} {
      display: none;
    }
  }
  .grow {
    flex-grow: 1;
  }
  .menuButton {
    margin-right: ${(p) => p.theme.spacing(2)};
  }
`);
