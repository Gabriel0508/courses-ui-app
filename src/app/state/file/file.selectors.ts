import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FileState } from './file.reducers';

export const selectUploadState = createFeatureSelector<FileState>('file');
export const selectUploadProgress = createSelector(
  selectUploadState,
  (state) => state.progress
);

export const selectDownloadURL = createSelector(
  selectUploadState,
  (state) => state.downloadURL
);

export const selectUploadedFileName = createSelector(
  selectUploadState,
  (state) => state.fileName
);

export const selectDownloadedBlob = createSelector(
  selectUploadState,
  (state) => state.blob
);

export const selectUploadError = createSelector(
  selectUploadState,
  (state) => state.error
);
