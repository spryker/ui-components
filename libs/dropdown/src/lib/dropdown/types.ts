export interface DropdownItem {
  action: string;
  title: string;
  icon?: string;
  disabled?: boolean;
  subItems?: DropdownItem[];
}

export type Placement =
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'topLeft'
  | 'topCenter'
  | 'topRight';
