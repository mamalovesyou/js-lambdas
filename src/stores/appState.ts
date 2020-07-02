import { UIStateType } from './ui/UIReducer';
import { JobsStateType } from './jobs/JobsReducer';

export default interface AppStateType {
    ui: UIStateType;
    jobs: JobsStateType
}