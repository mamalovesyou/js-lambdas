import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RuntimeIcon from './RuntimeIcon';

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        padding: theme.spacing(1, 1),
        backgroundColor: '#EBF3F4'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    content: {
        padding: 0,
        margin: 0,
        '&:last-child': {
            padding: 0
        }
    }
}));

type PanelProps = {
    children?: React.ReactNode;
    header?: string;
    subHeader?: string;
    type?: string;
}

export const Panel = ({ type, header, subHeader, children }: PanelProps) => {

    console.log(type)
    const classes = useStyles();

    return (
        <Card>
            <CardHeader
                className={classes.header}
                avatar={<RuntimeIcon type={type}></RuntimeIcon>}
                title={
                    <div className={classes.title}>
                        <Typography variant="subtitle1">
                            {header}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {subHeader}
                        </Typography>
                    </div>}
            />
            <CardContent classes={{ root: classes.content }}>
                {children}
            </CardContent>
        </Card>
    );
}

export default Panel;