import { TCarouselOptionsSlidesQty } from './types';

export interface ICarouselOptions {
	currentIndex: number;
	loadingClasses?: string | string[];
	dotsItemClasses?: string;
	isAutoHeight?: boolean;
	isAutoPlay?: boolean;
	isCentered?: boolean;
	isDraggable?: boolean;
	dragThreshold?: number;
	isInfiniteLoop?: boolean;
	isItemCustomWidth?: boolean;
	isRTL?: boolean;
	isSnap?: boolean;
	isScrollBlocked?: boolean;
	hasSnapSpacers?: boolean;
	slidesQty?: TCarouselOptionsSlidesQty | number;
	slideBy?: TCarouselOptionsSlidesQty | number | null;
	speed?: number;
	updateDelay?: number;
	mode?: 'default' | 'snap' | 'bounded';
	boundedOptions?: {
		maxWidth?: [number, 'px' | 'rem'];
		slidesGap?: [number, 'px' | 'rem'];
		spacersWidth?: number | 'auto';
	};
}

export interface ICarousel {
	options: ICarouselOptions;

	recalculateWidth(): void;
	goToPrev(): void;
	goToNext(): void;
	goTo(i: number): void;
	destroy(): void;
}
