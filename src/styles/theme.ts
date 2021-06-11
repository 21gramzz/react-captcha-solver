export const theme = {
  main: '#e1e6ea',
  shadow: '#bfc4c7',
  light: '#ffffff',
  success: '#38ef7d',
  warning: '#f8993a',
  danger: '#e5445f',
  primary: '#0072ff',
  accent: '#d1d9e6',
  text: '#001f3f',
};

export type Theme = typeof theme;
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
