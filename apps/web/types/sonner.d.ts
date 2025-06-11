declare module "sonner" {
  export const toast: {
    success: (msg: string) => void;
    error: (msg: string) => void;
  };
} 