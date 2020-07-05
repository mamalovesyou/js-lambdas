import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Switch } from 'react-router';
import { openMenuDrawer, closeMenuDrawer } from '../stores/ui/UIActions';
import { appRoutes } from '../routes';
import AppStateType from '../stores/appState';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import PoolSettings from './PoolSettings';
import { Chip } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  status: {
    margin: theme.spacing(0, 3)
  }
}));

const App = ({ open, socketMode, openMenuDrawer, closeMenuDrawer }: PropsFromRedux) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openMenuDrawer}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            JS Lambdas App
          </Typography>
          <Chip className={classes.status} label={socketMode ? "Socket Mode" : "Local Mode"} color="secondary" />
          <PoolSettings></PoolSettings>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={closeMenuDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <List>
          {appRoutes.map((route, index) => (
            // <Link key={index} to={route.path}>{route.menuComponent({key: index})}</Link>
            route.menuComponent(index, route.path)
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {appRoutes.map((route, index) => (
            <Route exact key={index} path={route.path} component={route.component}></Route>
          ))}
        </Switch>
      </main>
    </div>
  );
}

const mapState = (state: AppStateType) => ({
  open: state.ui.drawerOpen,
  socketMode: state.socket.enabled
})

const mapDispatch = (dispatch: Dispatch) => ({
  openMenuDrawer: () => dispatch(openMenuDrawer()),
  closeMenuDrawer: () => dispatch(closeMenuDrawer())
})

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(App)