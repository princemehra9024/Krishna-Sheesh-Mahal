declare module 'page-flip' {
  export interface PageFlipSettings {
    startPage?: number;
    size?: 'fixed' | 'stretch';
    width: number;
    height: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    swipeDistance?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
  }

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    loadFromImages(images: string[]): void;
    loadFromHTML(elements: HTMLElement[] | NodeListOf<HTMLElement>): void;
    updateFromImages(images: string[]): void;
    updateFromHtml(elements: HTMLElement[] | NodeListOf<HTMLElement>): void;
    turnToPrevPage(): void;
    turnToNextPage(): void;
    turnToPage(page: number): void;
    flipNext(corner?: 'top' | 'bottom'): void;
    flipPrev(corner?: 'top' | 'bottom'): void;
    flip(page: number, corner?: 'top' | 'bottom'): void;
    getPageCount(): number;
    getCurrentPageIndex(): number;
    getOrientation(): 'portrait' | 'landscape';
    getBoundsRect(): { left: number; top: number; width: number; height: number; pageWidth: number };
    getSettings(): PageFlipSettings;
    getState(): string;
    on(event: 'flip' | 'changeState' | 'changeOrientation' | 'init' | 'update', callback: (e: any) => void): this;
    off(event: string): void;
    destroy(): void;
  }
}
