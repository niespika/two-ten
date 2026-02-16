export type ToastVariant = 'success' | 'error';

export type ToastPayload = {
  id: number;
  message: string;
  variant: ToastVariant;
};

const TOAST_EVENT = 'app-toast';

export function emitToast(message: string, variant: ToastVariant) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent<ToastPayload>(TOAST_EVENT, {
      detail: {
        id: Date.now() + Math.random(),
        message,
        variant,
      },
    }),
  );
}

export const toast = {
  success(message: string) {
    emitToast(message, 'success');
  },
  error(message: string) {
    emitToast(message, 'error');
  },
};

export { TOAST_EVENT };
