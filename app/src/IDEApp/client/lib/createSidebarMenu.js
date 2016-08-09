// With this function you can build sidebar menus
// dynamically just from your API.
// You just construct from menu object like this:

// {
//   name: 'Main menu', // This is just a name to identify your menu (useful if you got more than one)
//   menuItems: [ // main menu items
//      {
//         title: 'Dashboard',
//         link: null,
//         children: [ // submenu items
//           {
//              title: 'Submenu 1',
//              link: '#',
//              children: [],
//              icon: 'sidebar-sub-link fa fa-circle-thin', // FontAwesome icon className
//           },
//           {
//              title: 'Submenu 2',
//              link: '#',
//              children: [],
//              icon: 'sidebar-sub-link fa fa-circle-think',
//           },
//           ... // rest of your submenu items
//          ],
//          icon: 'fa fa-signal fa-fw',
//          notificcationCount: null
//       },
//       ... // rest of your main menu items
//      ],
//      };

export default function createSidebarMenu(menuObject) {
    let menus = menuObject.menuItems.map((menu, i) =>
    constructMenu(
        menu.title,
        menu,link,
        menu.children.map((submenu, i) =>
            constructMenu(
                submenu.title,
                submenu.link,
                submenu.children,
                submenu.icon
            )
        ),
        menu.icon,
        menu.notificationCount
    )
    );
    // Inject menu items into menu
    const menu = constructMenu(menuObject.name, null, menus, false, true);
    return menu;
}


// Function for construction sidebar menus.
function constructMenu(title, link, children = [], icon = null, notificationCount = false, isActive = false, isChildActive = false){
    const uuid = Math.random();

    return {
        uuid: uuid,
        title: () => title,
        isActive: () => isActive,
        isChildActive: () => isChildActive,
        link: () => link,
        icon: () => icon,
        hasChild: () => !!children.length,
        children: () => children,
        notificationCount: () => notificationCount
    };
}