import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero implements OnInit, OnDestroy {
  titleText = '';
  private titles = [
    'Clinical Psychologist',
    'Educational Consultant',
    'Family Counselor',
    'Author',
  ];

  private index = 0;
  private deleting = false;
  private charIndex = 0;
  private timer: any;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    // Run the animation loop outside Angular to avoid infinite change detection
    this.zone.runOutsideAngular(() => this.loop());
  }

  loop() {
    const current = this.titles[this.index];
    const full = current;

    if (!this.deleting) {
      this.charIndex++;
      this.titleText = full.substring(0, this.charIndex);
    } else {
      this.charIndex--;
      this.titleText = full.substring(0, this.charIndex);
    }

    // Re-enter Angular only to update the DOM once per tick
    this.zone.run(() => (this.titleText = this.titleText));

    let delay = this.deleting ? 80 : 120;

    if (!this.deleting && this.charIndex === full.length) {
      this.deleting = true;
      delay = 1500;
    } else if (this.deleting && this.charIndex === 0) {
      this.deleting = false;
      this.index = (this.index + 1) % this.titles.length;
      delay = 400;
    }

    this.timer = setTimeout(() => this.loop(), delay);
  }

  ngOnDestroy() {
    clearTimeout(this.timer);
  }
}
