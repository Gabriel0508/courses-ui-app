import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiError } from 'src/app/core/models/error.model';

export const FileActions = createActionGroup({
  source: 'File',
  events: {
    'upload file': props<{ file: File }>(),
    'upload progress': props<{ progress: number }>(),
    'upload success': props<{ downloadURL: string; fileName: string }>(),
    'upload failure': props<{ error: ApiError }>(),
    'download file': props<{ downloadURL: string; fileName: string }>(),
    'download success': props<{ blob: Blob; fileName: string }>(),
    'download failure': props<{ error: ApiError }>(),
    'clearUploadState ': emptyProps()
  },
});
