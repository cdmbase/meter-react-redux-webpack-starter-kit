export default function createSidebarMenuButtons(menuObject) {
    let menus = menuObject.menuItems.map((menu, i) =>
        constructMenu(
            menu.title,
            menu.id,
            menu.action,
            menu.children && menu.children.map((submenu, i) =>
                constructMenu(
                    submenu.title,
                    submenu.id,
                    submenu.action,
                    submenu.children,
                    submenu.icon
                )
            ),
            menu.icon,
            menu.notificationCount
        )
    );
    // Inject menu items into menu.
    const menu = constructMenu(menuObject.title, menuObject.id, null, menus, null, false);
    return menu;
}


function constructMenu(title, id, action, children = [], icon = null, notificationCount = false) {
    const uuid = Math.random();
    return {
        uuid: uuid,
        title: () => title,
        id: () => id,
        action: () => action,
        icon: () => icon,
        hasChild: () => !!children.length,
        children: () => children,
        notificationCount: () => notificationCount
    };
}