import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    itemIcon: {
        overflowX: 'hidden',
        marginLeft: theme.spacing(1)
    },
}));

type MenuItemProps = {
    children: React.ReactNode;
    text: string;
    to: string;
  }

const MenuItem = ({ children, text, to}: MenuItemProps) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <ListItem component={Link} to={to} className={classes.root}>
                <ListItemIcon className={classes.itemIcon}>{children}</ListItemIcon>
                <ListItemText primary={text} />
            </ListItem>
            <Divider></Divider>
        </React.Fragment>
    )
}
        
export default MenuItem;