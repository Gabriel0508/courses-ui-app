import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {
  Component,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  NgZone,
} from '@angular/core';
import { interval } from 'rxjs';
import { takeWhile, tap, finalize } from 'rxjs/operators';

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

  selectedFile: File | null = null;
  uploadedFile: File | null = null;
  isHovering = false;
  uploadProgress: number | null = null;

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    if (!file) {
      return;
    }

    this.handleFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isHovering = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isHovering = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isHovering = false;
    const file = event.dataTransfer?.files?.[0] ?? null;
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File): void {
    this.selectedFile = file;
    this.uploadFile(file);
  }

  uploadFile(file: File): void {
    this.uploadProgress = 0;
    this.uploadedFile = file;
  }

  downloadFile(): void {
    if (!this.uploadedFile) {
      return;
    }

    const url = URL.createObjectURL(this.uploadedFile);

    // Create a temporary <a> element, set the href+download, and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = this.uploadedFile.name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  deleteFile(): void {
    this.uploadedFile = null;
    this.fileInput.nativeElement.value = '';
    this.uploadProgress = null;
  }
}
