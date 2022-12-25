import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { ConnectDialogDispatcherContext } from './ConnectDialog';
import {
  Link,
} from "react-router-dom";
import { BlogMenu } from './Blog';
import { styled } from '@mui/system';


interface HeaderProps {
  className?: string;
}

interface HeaderState {
  mobileMoreAnchorEl: Element | null;
  isBlogDrawerOpen: boolean;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = ConnectDialogDispatcherContext

  context!: React.ContextType<typeof ConnectDialogDispatcherContext>

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      mobileMoreAnchorEl: null,
      isBlogDrawerOpen: false,
    };
  }

  mobileMenuId = 'primary-search-account-menu-mobile';

  handleMobileMenuOpen = (event: React.MouseEvent) => { this.setState({ mobileMoreAnchorEl: event.currentTarget }) };
  handleMobileMenuClose = () => { this.setState({ mobileMoreAnchorEl: null }) };

  handleResume = () => {
    window.open(process.env.PUBLIC_URL + '/josh_bacon_resume.pdf', "_blank")
  }

  openBlogDrawer = () => {
    this.setState({ isBlogDrawerOpen: true })
  };
  closeBlogDrawer = () => {
    this.setState({ isBlogDrawerOpen: false })
  }

  render() {
    return (
      <AppBar position='static' color="default" className={this.props.className}>
        <Toolbar>
          <Button component={Link} to="/">JOSH BACON - Engineer</Button>
          <div className="grow" />
          <div className="sectionDesktop">
            <Button onClick={this.handleResume} color="inherit">Resume</Button>
            <Button onClick={this.context!.openConnectDialog} color="inherit">Contact</Button>
            <Button component={Link} to="/about" color="inherit" style={{ display: "none" }}>About</Button>
            <Button onClick={this.openBlogDrawer} color="inherit">Blog</Button>
          </div>
          <div className="sectionMobile">
            <IconButton
              color="inherit"
              aria-label="show more"
              aria-controls={this.mobileMenuId}
              aria-haspopup="true"
              onClick={this.handleMobileMenuOpen}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
        <Menu
          anchorEl={this.state.mobileMoreAnchorEl}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          id={this.mobileMenuId}
          keepMounted
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={Boolean(this.state.mobileMoreAnchorEl)}
          onClose={this.handleMobileMenuClose}
          onClick={this.handleMobileMenuClose}
          onScroll={this.handleMobileMenuClose}
        >
          <MenuItem onClick={this.handleResume}>Resume</MenuItem>
          <MenuItem onClick={this.context!.openConnectDialog}>Contact</MenuItem>
          <MenuItem component={Link} to="/about" style={{ display: "none" }} >About</MenuItem>
          <MenuItem onClick={this.openBlogDrawer} >Blog</MenuItem>
        </Menu>
        <BlogMenu open={this.state.isBlogDrawerOpen} onClose={this.closeBlogDrawer} />
      </AppBar>
    );
  }
}


export default styled(Header)<HeaderProps>`
  .sectionDesktop {
    display: none;
    ${p => p.theme.breakpoints.up('sm')} {
      display: flex;
    };
  }
  .sectionMobile {
    display: flex;
    ${p => p.theme.breakpoints.up('sm')} {
      display: none;
    }
  }
  .grow {
    flex-grow: 1;
  }
  .menuButton {
    margin-right: ${p => p.theme.spacing(2)};
  }
`;