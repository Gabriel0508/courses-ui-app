import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FileActions } from 'src/app/state/file/file.actions';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  combineLatest,
  filter,
  firstValueFrom,
} from 'rxjs';
import {
  selectUploadProgress,
  selectDownloadURL,
  selectUploadedFileName,
  selectDownloadedBlob,
} from 'src/app/state/file/file.selectors';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressBarModule,
  ],
})
export class UploadComponent {
  @ViewChild('fileInput', { static: true })
  fileInput!: ElementRef<HTMLInputElement>;
  isHovering = false;
  progress$: Observable<number> = this.store.select(selectUploadProgress);
  downloadURL$: Observable<string | null> =
    this.store.select(selectDownloadURL);
  fileName$: Observable<string | null> = this.store.select(
    selectUploadedFileName
  );
  blob$: Observable<Blob | null> = this.store.select(selectDownloadedBlob);

  private blobSub?: Subscription;

  constructor(private store: Store) {}

  ngOnInit() {
    this.blobSub = combineLatest([this.blob$, this.fileName$])
      .pipe(filter(([blob, name]) => !!blob && !!name))
      .subscribe(([blob, name]) => this.saveBlob(blob!, name!));
  }

  ngOnDestroy() {
    this.blobSub?.unsubscribe();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.store.dispatch(FileActions.uploadFile({ file }));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isHovering = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isHovering = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isHovering = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) this.store.dispatch(FileActions.uploadFile({ file }));
  }

  async onDownload() {
    // grab the latest URL & filename, then dispatch download
    const [url, name] = await firstValueFrom(
      combineLatest([this.downloadURL$, this.fileName$])
    );
    if (url && name) {
      this.store.dispatch(
        FileActions.downloadFile({ downloadURL: url, fileName: name })
      );
    }
  }

  onDelete() {
    this.store.dispatch(FileActions.clearUploadState());
    this.fileInput.nativeElement.value = '';
  }

  private saveBlob(blob: Blob, name: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }
}
