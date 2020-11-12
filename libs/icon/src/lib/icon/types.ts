export interface IconServiceInterface {
  addIcon(name: string, svg: IconSvg): Promise<void>;
}

export type IconSvgLoader = () => Promise<string>;

export type IconSvg = string | IconSvgLoader;

export interface Icon {
  icon: string;
  svg: IconSvg;
  forceInit?: boolean;
}
