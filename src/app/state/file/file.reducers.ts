import { createReducer, on } from '@ngrx/store';
import { ApiError } from 'src/app/core/models/error.model';
import { FileActions } from './file.actions';

export interface FileState {
  progress: number;
  downloadURL: string | null;
  fileName: string | null;
  blob: Blob | null;
  error: ApiError | null;
}

export const initialState: FileState = {
  progress: 0,
  downloadURL: null,
  fileName: null,
  blob: null,
  error: null,
};

export const fileReducer = createReducer(
  initialState,
  on(FileActions.uploadProgress, (state, { progress }) => ({
    ...state,
    progress,
  })),
  on(FileActions.uploadSuccess, (state, { downloadURL, fileName }) => ({
    ...state,
    downloadURL,
    fileName,
    progress: 100,
    error: null,
  })),
  on(FileActions.uploadFailure, (state, { error }) => ({ ...state, error })),
  on(FileActions.downloadFile, (state) => ({
    ...state,
    blob: null,
    error: null,
  })),
  on(FileActions.downloadSuccess, (state, { blob, fileName }) => ({
    ...state,
    blob,
    fileName,
  })),
  on(FileActions.downloadFailure, (state, { error }) => ({ ...state, error })),
  on(FileActions.clearUploadState, () => ({
    ...initialState,
  }))
);
