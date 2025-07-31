export interface MenuItem {
  id:number;
  name: string;
  icon: string;
  parentId:number | null;
  subMenu: MenuItem[] | null;
  route: string | null;
  expanded?:boolean;
}
