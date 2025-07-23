export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  type: 'link' | 'settings' | 'action';
  action?: () => void;
}
