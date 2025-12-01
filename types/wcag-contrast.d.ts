declare module 'wcag-contrast' {
  export const WCAG: {
    getContrastRatio(color1: string, color2: string): number;
    isReadable(color1: string, color2: string, options?: any): boolean;
    score(color1: string, color2: string): string;
  };
}
