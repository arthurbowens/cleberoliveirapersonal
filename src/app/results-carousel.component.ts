import { Component, ElementRef, input, signal, viewChild, afterNextRender } from '@angular/core';

export interface Result {
  image: string;
  title: string;
  goal: string;
}

@Component({
  selector: 'app-results-carousel',
  template: `
    <div class="relative">
      <div
        #track
        class="results-carousel-track flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6"
        aria-label="Carrossel de resultados"
      >
        @for (result of results(); track result.image; let i = $index) {
          <article
            data-slide
            class="results-carousel-slide snap-center shrink-0 w-[85%] sm:w-[70%] md:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
          >
            <div
              class="relative rounded-2xl overflow-hidden border border-brand-gray-800 bg-brand-gray-900 group"
            >
              <img
                [src]="result.image"
                [alt]="'Resultado de ' + result.goal.toLowerCase() + ' com Cléber Oliveira'"
                class="w-full aspect-[3/4] object-cover"
                loading="lazy"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/30 pointer-events-none"
              ></div>
              <span
                class="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-black/75 text-white text-xs font-semibold uppercase tracking-wide"
              >
                Antes
              </span>
              <span
                class="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-brand-green text-brand-black text-xs font-semibold uppercase tracking-wide"
              >
                Depois
              </span>
              <div class="absolute bottom-0 left-0 right-0 p-4">
                <p class="text-brand-green text-xs font-semibold uppercase tracking-widest mb-1">
                  {{ result.goal }}
                </p>
                <p class="text-white font-bold text-lg leading-tight">{{ result.title }}</p>
              </div>
            </div>
          </article>
        }
      </div>

      <button
        type="button"
        class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 items-center justify-center rounded-full bg-brand-gray-900 border border-brand-gray-700 text-white hover:border-brand-green hover:text-brand-green transition-colors"
        (click)="prev()"
        aria-label="Resultado anterior"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 items-center justify-center rounded-full bg-brand-gray-900 border border-brand-gray-700 text-white hover:border-brand-green hover:text-brand-green transition-colors"
        (click)="next()"
        aria-label="Próximo resultado"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div class="flex items-center justify-center gap-2 mt-6">
        @for (result of results(); track result.image; let i = $index) {
          <button
            type="button"
            class="h-2 rounded-full transition-all duration-300"
            [class]="i === activeIndex() ? 'w-8 bg-brand-green' : 'w-2 bg-brand-gray-700 hover:bg-brand-gray-500'"
            (click)="scrollTo(i)"
            [attr.aria-label]="'Ir para resultado ' + (i + 1)"
          ></button>
        }
      </div>

      <p class="md:hidden text-center text-brand-gray-500 text-xs mt-3">
        Deslize para ver mais resultados
      </p>
    </div>
  `,
})
export class ResultsCarouselComponent {
  readonly results = input.required<Result[]>();
  readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  readonly activeIndex = signal(0);

  constructor() {
    afterNextRender(() => {
      this.track().nativeElement.addEventListener('scroll', () => this.updateActiveIndex(), {
        passive: true,
      });
    });
  }

  prev(): void {
    const index = Math.max(this.activeIndex() - 1, 0);
    this.scrollTo(index);
  }

  next(): void {
    const index = Math.min(this.activeIndex() + 1, this.results().length - 1);
    this.scrollTo(index);
  }

  scrollTo(index: number): void {
    const track = this.track().nativeElement;
    const slide = track.querySelectorAll('[data-slide]')[index] as HTMLElement | undefined;
    if (!slide) return;

    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior: 'smooth',
    });
    this.activeIndex.set(index);
  }

  private updateActiveIndex(): void {
    const track = this.track().nativeElement;
    const slides = Array.from(track.querySelectorAll('[data-slide]')) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;

    let closest = 0;
    let minDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const distance = Math.abs(center - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    this.activeIndex.set(closest);
  }
}
