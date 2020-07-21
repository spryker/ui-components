export type TreeSelectValue = string | number;

export interface TreeSelectItem {
  title: string;
  value: TreeSelectValue;
  isDisabled?: boolean;
  children?: TreeSelectItem[];
}
