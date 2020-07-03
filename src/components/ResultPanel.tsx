import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Panel from './Panel';
import { FormatTimeAgo } from '../utils';
import useInterval from '../hooks/useInterval';

const useStyles = makeStyles((theme: Theme) => ({
    panelContent: {
        padding: theme.spacing(2),
        minHeight: '152px'
    },
    error: {
        color: red[500]
    }
}));

type Props = {
    result?: string;
    error?: string;
    inProgress?: boolean;
    finishedAt?: number;
    interval?: number;
}

export const ResultPanel = ({ result, error, inProgress, finishedAt, interval=15 }: Props) => {

    const classes = useStyles();
    const [hasError, setHasError] = React.useState(false);
    const [hasResult, setHasResult] = React.useState(false);

    React.useEffect(() => {
        (error) ? setHasError(true) : setHasError(false);
    }, [error])

    React.useEffect(() => {
        (result) ? setHasResult(true) : setHasResult(false);
    }, [result])

    // Update job finished time
    const [subHeader, setSubHeader] = React.useState("");
    const refresh = interval * 1000;
    useInterval(() => { setSubHeader(getSubHeader()) }, refresh);
    React.useEffect(() => { setSubHeader(getSubHeader()) }, [finishedAt])

    const getStatus = () => {
        if(hasError) return "error";
        if(hasResult) return "success";
        if(inProgress) return "progress";
        return undefined;
    }

    const getSubHeader = () => {
        if(finishedAt) return "completed " + FormatTimeAgo(finishedAt);
        return "";
    }

    return (
        <Panel header={"Result"} type={getStatus()} subHeader={subHeader}>
            <div className={classes.panelContent}>
                { hasResult && <Typography variant="body1"> { result } </Typography> }
                { hasError && <Typography className={classes.error} variant="body1"> { error } </Typography> }
            </div>
        </Panel>
    );
}

export default ResultPanel;