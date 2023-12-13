export {};

declare global {
  interface Window {
    snap: { pay: (string: string) => void };
  }
}
