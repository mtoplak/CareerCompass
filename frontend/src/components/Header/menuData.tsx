import { Menu } from "@/types/menu";

// A/B testing: randomly select between /zaposlitve and /vse-zaposlitve for menu item id=2
const getMenuData = (): Menu[] => {
  return [
    {
      id: 1,
      title: "Podjetja",
      path: "/podjetja",
      newTab: false,
    },
    {
      id: 2,
      title: "Zaposlitve",
      path: Math.random() < 0.5 ? "/zaposlitve" : "/vse-zaposlitve",
      newTab: false,
    },
    {
      id: 3,
      title: "Za delodajalce",
      path: "/za-delodajalce",
      newTab: false,
    },
  ];
};

export default getMenuData;
