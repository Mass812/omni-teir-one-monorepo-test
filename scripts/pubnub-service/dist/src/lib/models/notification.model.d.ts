export declare class Notification {
  title: string;
  subtitle?: string;
  confirmLabel?: string;
  declineLabel?: string;
  image?: string;
  beep?: boolean;
  vibrate?: boolean;
  dismissOnTap?: boolean;
  onConfirm?: Record<string, string | number | unknown>;
}
