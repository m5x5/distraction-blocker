import { BrowserWindow, Menu, MenuItem } from "electron";

export function initMenu(window: BrowserWindow) {
  const menu = new Menu();
  menu.append(
    new MenuItem({
      label: "Electron",
      submenu: [
        {
          role: "services",
          accelerator: "Ctrl+1",
          click: () => {
            window.webContents.send("switchTab", "goals");
          },
        },
        {
          role: "services",
          accelerator: "Ctrl+2",
          click: () => {
            window.webContents.send("switchTab", "jobs");
          },
        },
        {
          role: "services",
          accelerator: "Ctrl+3",
          click: () => {
            window.webContents.send("switchTab", "dedicate");
          },
        },
        {
          role: "services",
          accelerator: "Ctrl+shift+a",
          click: () => {
            window.webContents.send("create");
          },
        },
        {
          role: "toggleDevTools",
          accelerator: "Ctrl+Shift+I",
          click: () => {
            window.webContents.toggleDevTools();
          },
        },
        {
          role: "reload",
          accelerator: "Ctrl+R",
          click: () => {
            window.webContents.reload();
          },
        },
        {
          role: "forceReload",
          accelerator: "Ctrl+Shift+R",
          click: () => {
            window.webContents.reloadIgnoringCache();
          },
        },
      ],
    })
  );

  Menu.setApplicationMenu(menu);
}
