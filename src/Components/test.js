import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import '../App.css';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DateRangeIcon from '@mui/icons-material/DateRange';
// import Expenses from './Expenses'

const drawerWidth = 240;

function ResponsiveDrawer(props) {
    // const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const settings = ['Profile'];


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const iconMap = {
    Home: <HomeIcon />,
    Notes: <EditNoteIcon />,
    Expenses: <PointOfSaleIcon />,
    Agenda: <DateRangeIcon />
};

const routes = ['Home', 'Notes', 'Expenses', 'Agenda'];

const drawer = (
    <div>
        <Toolbar />
        <Divider />
        <List>
            {routes.map((text, index) => (
                <Link to={text === 'Home' ? '/' : `/${text}`} key={text} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{ color: '#fff' }}>
                                {iconMap[text]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
    </div>
);
  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div className='ico'>
          <img src='ico.png' alt='icon'></img>
          <Typography variant="h6" noWrap component="div">
            Memento
          </Typography>
          </div>
        </Toolbar>
        <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className='avatarname'>
                <Typography className='name'>Abanoub Yousry</Typography>
                <img src='img.png' alt='img' className='imgpro'></img>
                </div>

              </IconButton>
            </Tooltip>
                        <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} >
                <a href='https://www.linkedin.com/in/abanoub-yousry-5a70252ba'>{setting}</a>
                </MenuItem>
              ))}
            </Menu>

      </AppBar>
      {/* <ResponsiveAppBar /> */}

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>

      </Box>
      {/* <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <div className='home'>
        <div className='cont'>
          <h1>Welcome to Memento</h1>
          <p>This site helps you save and record your notes, tasks, and daily expenses</p>
        </div>
        <img src='bg.png' alt='pic'></img>
        </div>
      </Box> */}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;