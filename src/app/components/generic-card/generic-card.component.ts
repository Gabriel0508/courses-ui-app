import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Course } from 'src/app/core/models/course.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-generic-card',
  templateUrl: './generic-card.component.html',
  styleUrls: ['./generic-card.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule, MatIconModule],
})
export class GenericCardComponent {
  @Input() courses: Course[] | undefined;
  @Input() id: string | undefined;
  @Output() openCourse = new EventEmitter<string>();

  courseMock = {
    previewUrl:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    // Update with your video path
  };
  @ViewChild('previewVideo') previewVideo!: ElementRef<HTMLVideoElement>;

  constructor() {}

  playPreview() {
    if (!this.previewVideo) return;
    const video = this.previewVideo.nativeElement;
    video.play().catch((err) => {
      if (err.name !== 'AbortError') {
        console.error('Error playing video:', err);
      }
    });
  }

  pausePreview() {
    if (!this.previewVideo) return;
    const video = this.previewVideo.nativeElement;
    video.pause();
    video.currentTime = 0;
  }

  onOpenCourse(): void {
    this.openCourse.emit(this.id);
  }
}
