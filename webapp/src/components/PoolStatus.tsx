import React from 'react';
import Typography from '@material-ui/core/Typography';
import RuntimeIcon from './RuntimeIcon';
import { WorkerPoolStats } from '../workers';

type Props = React.HTMLAttributes<HTMLDivElement> & {
    pool: WorkerPoolStats
}
const PoolStatus = ({className, pool}: Props) => {
    return <>
            <RuntimeIcon className={className} type={ (pool.isBusy) ? "progress" : "success" }></RuntimeIcon>
            { (pool.isBusy) ?
                <Typography variant="subtitle1"> {pool.running} workers are running and {pool.waitingJobs} are on hold.</Typography> :
                <Typography variant="subtitle1"> No job running or waiting</Typography>
            }
        </>
}

export default PoolStatus;