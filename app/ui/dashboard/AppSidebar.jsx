"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  ChevronDownIcon,
  DetailIcon,
  GridIcon,
  HangarIcon,
  HorizontaLDots,
  MapIcon,
  SettingsIcon,
} from "../icons";

const navItems = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard/home",
  },

  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
        />
      </svg>
    ),
    name: "Cultivateurs",
    subItems: [
      { name: "Details", path: "/dashboard/cultivators" },
      {
        name: "Liste",
        path: "/dashboard/cultivators/list",
      },
    ],
    startWithUrl: "/dashboard/cultivators/",
  },
  {
    icon: <HangarIcon />,
    name: "Hangars",

    // subMenuIcon: <HangarIcon />,
    subItems: [
      { icon: <DetailIcon />, name: "Details", path: "/dashboard/hangars" },
      {
        icon: <MapIcon />,
        name: "Repartition",
        path: "/dashboard/hangars/geolocalisation",
      },
      {
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        ),
        name: "Ajouter",
        path: "/dashboard/hangars/add_new",
      },
    ],
    startWithUrl: "/dashboard/hangars/",
  },
  {
    icon: <BoxCubeIcon />,
    name: "Stock",
    path: "/dashboard/stocks",
    subItems: [
      { name: "Details", path: "/dashboard/stocks" },
      { name: "Achats", path: "/dashboard/stocks/achats" },
      {
        name: "Ventes",
        path: "/dashboard/stocks/sold_out",
      },
      {
        name: "Sorties",
        path: "/dashboard/stocks/out/en_attente",
      },
    ],
    startWithUrl: "/dashboard/stocks/",
  },
  // {
  //   icon: (
  //     <Image
  //       className="rounded-xl"
  //       src="/img/brarudi-logo.png"
  //       alt="Brarudi"
  //       width={32}
  //       height={32}
  //     />
  //   ),
  //   name: "BRARUDI",
  //   path: "/dashboard/Brarudi/en_attente",
  //   startWithUrl: "/dashboard/Brarudi/",
  // },

  {
    icon: (
      <Image
        className="rounded-xl"
        src="/img/brarudi-logo.png"
        alt="Brarudi"
        width={32}
        height={32}
      />
    ),
    name: "Brarudi",
    path: "/dashboard/brarudi/en_attente",
    subItems: [
      { name: "Agent", path: "/brarudi/stocks" },
      { name: "ANAGESSA", path: "/dashboard/Brarudi/en_attente" },
    ],
    startWithUrl: "/dashboard/Brarudi/en_attente",
  },
  {
    icon: (
      <Image
        className="rounded-xl"
        src="/img/role-logo.png"
        alt="Roles"
        width={32}
        height={32}
      />
    ),
    name: "Roles",
    path: "/municipal/cultivators",
    subItems: [
      { name: "Communal", path: "/municipal/hangars" },
      { name: "Provincial", path: "/provincial/hangars" },
    ],
    startWithUrl: "/municipal/cultivators",
  },
  {
    icon: <SettingsIcon />,
    name: "Parametre",
    path: "/dashboard/settings/profile",
    startWithUrl: "/dashboard/settings/",
  },
];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback((path) => path === pathname, [pathname]);

  const isPathActive = useCallback(
    (item) => {
      if (isActive(item.path)) return true;
      if (item.subPath && item.subPath.some((path) => isActive(path)))
        return true;
      if (item.startWithUrl && pathname.startsWith(item.startWithUrl))
        return true;
      return false;
    },
    [isActive, pathname]
  );

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) =>
      prev && prev.type === menuType && prev.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const renderMenuItems = (navItems, menuType) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                (openSubmenu?.type === menuType &&
                  openSubmenu?.index === index) ||
                isPathActive(nav)
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`${
                  (openSubmenu?.type === menuType &&
                    openSubmenu?.index === index) ||
                  isPathActive(nav)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200  ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-green-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isPathActive(nav) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isPathActive(nav)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300 "
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9  p-2 rounded">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      className={`menu-dropdown-item ${
                        isPathActive(subItem)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.icon && (
                        <span className="mr-">{subItem.icon}</span>
                      )}
                      {subItem.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const el = subMenuRefs.current[key];
      if (el) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: el.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  return (
    <aside
      className={`fixed  mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/dashboard/home">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="hidden lg:block dark:hidden rounded-2xl"
                src="/img/ANAGESSA LOGO.jpg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                //for dark mode
                className="hidden dark:lg:block"
                src="/img/ANAGESSA LOGO.jpg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              className="rounded-xl"
              src="/img/ANAGESSA LOGO.jpg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>

            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {/* {isExpanded || isHovered || isMobileOpen ? (
                  "Autre"
                ) : (
                  <HorizontaLDots />
                )} */}
              </h2>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
