import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Panel from './Panel';

const useStyles = makeStyles((theme: Theme) => ({
    panelContent: {
        padding: theme.spacing(2),
        minHeight: '150px'
    },
    error: {
        color: red[500]
    }
}));

type Props = {
    result?: string;
    error?: string;
    inProgress: boolean;
}

export const ResultPanel = ({ result, error, inProgress }: Props) => {

    const classes = useStyles();
    const [hasError, setHasError] = React.useState(false);
    const [hasResult, setHasResult] = React.useState(false);

    React.useEffect(() => {
        (error) ? setHasError(true) : setHasError(false);
    }, [error])

    React.useEffect(() => {
        (result) ? setHasResult(true) : setHasResult(false);
    }, [result])

    const getStatus = () => {
        if(hasError) return "error";
        if(hasResult) return "success";
        if(inProgress) return "progress";
        return undefined;
    }



    return (
        <Panel header={"Result"} type={getStatus()}>
            <div className={classes.panelContent}>
                { hasResult && <Typography variant="body1"> { result } </Typography> }
                { hasError && <Typography className={classes.error} variant="body1"> { error } </Typography> }
            </div>
        </Panel>
    );
}

export default ResultPanel;