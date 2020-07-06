import React, { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import IAppState from '../stores/appState';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { setMaxWorkers } from '../stores/pool/PoolActions';
import SettingsIcon from '@material-ui/icons/Settings';

export const PoolSettings = ({ size, applyChanges }: PropsFromRedux) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Handle Pool resize behavior
    const [maxWorkers, setMaxWorkers] = React.useState(size);
    React.useEffect(() => {setMaxWorkers(maxWorkers)}, [size]);
    const handleMaxWorkersChange = (e: ChangeEvent<HTMLInputElement>) => setMaxWorkers(Number.parseInt(e.target.value));
    const handleApplyChanges = () => {
        applyChanges(maxWorkers);
        handleClose();
    }

    return (
        <div>
            <Button color="inherit" variant="outlined" onClick={handleClickOpen} startIcon={<SettingsIcon/>}>
                Settings
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">WorkerPool Settings</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can change your pool settings from this panel
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="WorkerPool Size"
                        type="number"
                        fullWidth
                        value={maxWorkers}
                        onChange={handleMaxWorkersChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleApplyChanges} color="primary">
                        Apply Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapState = (state: IAppState) => ({
    size: state.pool.size
});

const mapDispatch = (dispatch: Dispatch) => ({
    applyChanges: (size: number) => dispatch(setMaxWorkers(size))
});

const connector = connect(mapState, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PoolSettings);