interface SubItem {
  title: string;
  path: string;
}

export interface MenuItemData {
  title: string;
  icon: React.ReactNode;
  subItems?: SubItem[];
  path?: string;
}
