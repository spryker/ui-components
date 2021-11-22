export type TreeSelectValue = string | number;

export interface TreeSelectItem {
  title: string;
  value: TreeSelectValue;
  disabled?: boolean;
  children?: TreeSelectItem[];
}
