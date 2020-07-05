import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppStateType from '../stores/appState';
import { JobResult } from '../workers';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Page from '../components/Page';
import ScriptPanel from '../components/ScriptPanel';
import ResultPanel from '../components/ResultPanel';
import PoolStatus from '../components/PoolStatus';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(2)
    },
    status: {
        display: 'inline-flex',
        padding: theme.spacing(1, 0),
    },
    statusIcon: {
        margin: theme.spacing(0, 1, 0, 2),
    }
}));

const mapState = (state: AppStateType) => ({
    history: state.jobs.history,
    pool: state.pool,
    workerId: state.socket.workerId
});

const connector = connect(mapState, null);

type PropsFromRedux = ConnectedProps<typeof connector>

const WorkerModePage = ({ pool, history, workerId }: PropsFromRedux) => {

    const classes = useStyles();

    return (
        <Page title={`Worker Mode [${workerId}]`}
            subHeader={
                <div className={classes.status}>
                    <Typography variant="subtitle1" color="textSecondary">Status: </Typography>
                    <PoolStatus className={classes.statusIcon} pool={pool}></PoolStatus>
                </div>
            }
        >
            {(history as JobResult[]).map((job: JobResult) =>
                <Paper className={classes.root} key={job.id}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ScriptPanel script={job.script} recievedAt={job.recievedAt}></ScriptPanel>

                        </Grid>
                        <Grid item xs={6}>
                            <ResultPanel result={job.result} error={job.error} finishedAt={job.finishedAt}></ResultPanel>
                        </Grid>
                    </Grid>
                </Paper>

            )}
        </Page>
    );
}


export default connector(WorkerModePage);
