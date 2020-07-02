import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: 0
    },
    title: {
        paddingTop: theme.spacing(1),
        paddingBotom: theme.spacing(1)
    },
    divider: {
        borderBottom: '1px solid #d3d3d3',
        width: '100%',
        marginBottom: theme.spacing(2)
    }
}));

type PageProps = {
    children: React.ReactNode;
    subHeader: React.ReactNode;
    title: string;
}

const Page = ({title, children, subHeader}: PageProps) => {

    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Typography variant="h6" className={classes.title}>{ title }</Typography>
            {subHeader}
            <div className={classes.divider}></div>
            { children }
        </Container>
    );
}

export default Page;
