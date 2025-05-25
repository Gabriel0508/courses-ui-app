import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FileActions } from './file.actions';
import { CourseService } from 'src/app/core/services/course.service';
import { UploadProgress } from 'src/app/core/models/file.model';

@Injectable()
export class UploadEffects {
  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) {}

  upload$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.uploadFile),
      mergeMap(({ file }) =>
        this.courseService.uploadFile(file).pipe(
          mergeMap((event: UploadProgress) => {
            if (event.downloadURL) {
              return [
                FileActions.uploadProgress({ progress: 100 }),
                FileActions.uploadSuccess({
                  downloadURL: event.downloadURL,
                  fileName: file.name,
                }),
              ];
            }
            return [FileActions.uploadProgress({ progress: event.progress })];
          }),
          catchError((error) => of(FileActions.uploadFailure({ error })))
        )
      )
    )
  );

  download$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FileActions.downloadFile),
      mergeMap(({ downloadURL, fileName }) =>
        this.courseService.downloadFile(downloadURL).pipe(
          map((blob) => FileActions.downloadSuccess({ blob, fileName })),
          catchError((error) => of(FileActions.downloadFailure({ error })))
        )
      )
    )
  );
}
