import '@testing-library/jest-dom';

// Basic window.matchMedia polyfill for embla-carousel and other libs
if (typeof window !== 'undefined' && !window.matchMedia) {
  // @ts-ignore
  window.matchMedia = function (query: any) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {}, // deprecated
      removeListener: function () {}, // deprecated
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () { return false; }
    } as any;
  };
}

// Basic IntersectionObserver mock for test environment
if (typeof window !== 'undefined' && !(window as any).IntersectionObserver) {
  (window as any).IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// ResizeObserver mock
if (typeof window !== 'undefined' && !(window as any).ResizeObserver) {
  (window as any).ResizeObserver = class {
    constructor(cb?: any) { this.cb = cb; }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
