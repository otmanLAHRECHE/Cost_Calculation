import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import OutputIcon from '@mui/icons-material/Output';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ThreePRoundedIcon from '@mui/icons-material/ThreePRounded';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Slide from '@mui/material/Slide';
import CategoryIcon from '@mui/icons-material/Category';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LanIcon from '@mui/icons-material/Lan';
import Cuisine_Articles from './Cuisine_articles';
import Cuisine_consomation_ultra from './CuisineConsomationUltra';
import Cuisine_Services from './Cuisine_services';

import Cuisine_consomation from './Cuisine_consomation';
const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent_Cuisine() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [toolBar,setToolBar] = React.useState("Tableau de bord et statestiques")


  const [logOut, setLogOut] = React.useState(false);

  const [openLogOut, setOpenLogOut] = React.useState(false);

  const LogOutClose = () =>{
    setOpenLogOut(false);
  }

  const LogOutConfirmation = async () =>{
    await localStorage.removeItem("auth_token");
    await localStorage.removeItem("user_type");
    setLogOut(true);
  }
  
  const handleLogOut = () =>{

    setOpenLogOut(true);
    
  }

  const clickConsomation = () =>{
    
      setPage([true,false,false,false])
      setToolBar("Quantité conventionnelle")
  };

  const clickPrix= () =>{
  
    setPage([false,true,false,false])
    setToolBar("Consommation")
   
  
  };

  const clickArticles = () =>{
  
    setPage([false,false,true,false])
    setToolBar("Liste des articles")
  
  };
  const clickServices= () =>{
  
    setPage([false,false,false,true])
    setToolBar("Services")
  
  };


  const [page, setPage] = React.useState([true,false,false,false]);
  
  if(localStorage.getItem("auth_token")==null && logOut == true){
    window.location.reload();
  }
  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
              backgroundColor: '#d87d4e', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {toolBar}
            </Typography>

            <Button color="inherit" startIcon={<ThreePRoundedIcon />}>Cuisine</Button>
            <FiberManualRecordIcon
                fontSize="small"
                  sx={{
                    mr: 1,
                    color: '#4caf50',
                  }}
            />      
            
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="secondary"
                onClick={handleLogOut}
              >
                <LogoutIcon />
              </IconButton>

          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
                <ListItemButton selected = {page[0]} onClick={clickConsomation}>
                  <ListItemIcon>
                    <PriceChangeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Qnt conventionnelle"/>
                </ListItemButton>
                <ListItemButton selected={page[1]} onClick={clickPrix}>
                  <ListItemIcon>
                    <BackupTableIcon />
                  </ListItemIcon>
                  <ListItemText primary="Consommation" />
                </ListItemButton>
                            <Divider sx={{ my: 1 }} />
                    <ListSubheader component="div" inset>
                      Autre options
                    </ListSubheader>
                <ListItemButton selected={page[2]} onClick={clickArticles}>
                  <ListItemIcon>
                    <CategoryIcon />
                  </ListItemIcon>
                  <ListItemText primary="Produits" />
                </ListItemButton>
                <ListItemButton selected={page[3]} onClick={clickServices}>
                  <ListItemIcon>
                    <LanIcon />
                  </ListItemIcon>
                  <ListItemText primary="Services" />
                </ListItemButton>
                
                
                    
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
        <Toolbar />

        
        {page[0] ? <Cuisine_consomation/> : null}
        {page[1] ? <Cuisine_consomation_ultra/> : null}
        {page[2] ? <Cuisine_Articles/> : null}
        {page[3] ? <Cuisine_Services/> : null}
        
        

        
          
        </Box>
      </Box>

      <Dialog open={openLogOut}
                                TransitionComponent={Transition}
                                keepMounted
                                onClose={LogOutClose}
                                aria-describedby="alert-dialog-slide-description"
                              >
                                <DialogTitle>{"Confirmer la déconnection"}</DialogTitle>
                                <DialogContent>
                                  <DialogContentText id="alert-dialog-slide-description">
                                  Êtes-vous sûr ?
                                  </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={LogOutClose}>Anuller</Button>
                                  <Button onClick={LogOutConfirmation}>Log out</Button>
                                </DialogActions>
                  </Dialog>
    </ThemeProvider>
  );
}

export default function Dashboard_Cuisine() {
  return <DashboardContent_Cuisine />;
}