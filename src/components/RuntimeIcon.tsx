import React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        fontSize: '25px'
    },
    errorIcon: {
        color: red[500]
    },
    successIcon: {
        color: green[500]
    },
    circle: {
        strokeLinecap: 'round',
    },

}));

type RuntimeIconProps = React.HTMLAttributes<HTMLDivElement> & {
    type?: string;
}

export const RuntimeIcon = ({ className, type }: RuntimeIconProps) => {

    const classes = useStyles();
    const getIcon = () => {

        switch (type) {
            case "progress":
                return <CircularProgress className={clsx(classes.icon, className)}
                    disableShrink
                    variant="indeterminate"
                    size={25}
                    thickness={4}
                    classes={{
                        circle: classes.circle,
                    }}></CircularProgress>
            case "error":
                return <ErrorIcon className={clsx(classes.icon, classes.errorIcon, className)}></ErrorIcon>
            case "success":
                return <CheckCircleIcon className={clsx(classes.icon, classes.successIcon, className)}></CheckCircleIcon>
            default:
                return <div className={className}></div>
        }
    }

    return getIcon();
};

export default RuntimeIcon;