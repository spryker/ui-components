export interface NavigationComponentMethods {
    collapse(): void;
    expand(): void;
    toggle(): boolean;
    isCollapsed(): boolean;
}

export interface NavigationItem {
    title: string;
    url?: string;
    icon?: string;
    isActive?: boolean;
    isDisabled?: boolean;
    subItems?: NavigationItem[];
}
