import {
  AppBar,
  Button,
  Fab,
  IconButton,
  Menu,
  MenuItem,
  Zoom,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { ConnectDialogDispatcherContext } from "./ConnectDialog";
import { Link } from "react-router-dom";
import { BlogMenu } from "./Blog";
import { styled } from "@mui/system";
import { withAuth0, WithAuth0Props } from "@auth0/auth0-react";
import EmailIcon from "@mui/icons-material/Email";

interface HeaderProps extends WithAuth0Props {
  className?: string;
}

interface HeaderState {
  mobileMoreAnchorEl: Element | null;
  isBlogDrawerOpen: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = ConnectDialogDispatcherContext;

  context!: React.ContextType<typeof ConnectDialogDispatcherContext>;

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      mobileMoreAnchorEl: null,
      isBlogDrawerOpen: false,
    };
  }

  mobileMenuId = "primary-search-account-menu-mobile";

  handleMobileMenuOpen = (event: React.MouseEvent) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleResume = () => {
    window.open(process.env.PUBLIC_URL + "/josh_bacon_resume.pdf", "_blank");
  };

  openBlogDrawer = () => {
    this.setState({ isBlogDrawerOpen: true });
  };

  closeBlogDrawer = () => {
    this.setState({ isBlogDrawerOpen: false });
  };

  signUp = () => {
    // sessionStorage.setItem("redirect_route", window.location.pathname+window.location.search);
    this.props.auth0
      ?.loginWithRedirect({
        appState: {
          redirectTo: window.location.pathname + window.location.search,
        },
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  signOut = () => {
    this.props.auth0?.logout({
      returnTo: window.location.origin + "/signout",
    });
  };

  render() {
    return (
      <AppBar
        position="static"
        color="default"
        className={this.props.className}
      >
        <Toolbar>
          <Button component={Link} to="/">
            JOSH BACON - Engineer
          </Button>
          <div className="grow" />
          {this.props.auth0?.isAuthenticated && (
            <Typography>Hi, {this.props.auth0?.user?.name}</Typography>
          )}
          <div className="sectionDesktop">
            <Button onClick={this.handleResume} color="inherit">
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
            <Button onClick={this.openBlogDrawer} color="inherit">
              Blog
            </Button>
            {!this.props.auth0?.isAuthenticated && (
              <Button onClick={this.signUp} color="inherit">
                Connect
              </Button>
            )}
            {/* {this.props.auth0?.isAuthenticated && <Button onClick={this.signOut} color="inherit">Sign Out</Button>} */}
          </div>
          <div className="sectionMobile">
            <IconButton
              color="inherit"
              aria-label="show more"
              aria-controls={this.mobileMenuId}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Menu
          anchorEl={this.state.mobileMoreAnchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={this.mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(this.state.mobileMoreAnchorEl)}
          onClose={this.handleMobileMenuClose}
          onClick={this.handleMobileMenuClose}
          onScroll={this.handleMobileMenuClose}
        >
          <MenuItem onClick={this.handleResume}>Resume</MenuItem>
          <MenuItem component={Link} to="/about" style={{ display: "none" }}>
            About
          </MenuItem>
          <MenuItem onClick={this.openBlogDrawer}>Blog</MenuItem>
          {!this.props.auth0?.isAuthenticated && (
            <MenuItem onClick={this.signUp}>Connect</MenuItem>
          )}
          {/* {this.props.auth0?.isAuthenticated && <MenuItem onClick={this.signOut} >Sign Out</MenuItem>} */}
        </Menu>
        <BlogMenu
          open={this.state.isBlogDrawerOpen}
          onClose={this.closeBlogDrawer}
        />
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
            onClick={this.context?.openConnectDialog}
          >
            <EmailIcon />
          </Fab>
        </Zoom>
      </AppBar>
    );
  }
}

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
