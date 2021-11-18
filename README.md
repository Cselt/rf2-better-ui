# rf2-better-ui

In this repository you can find small modifications for the new rFactor 2 UI

# How to install

1. Go to latest relaese page and download installer: [link](https://github.com/Cselt/rf2-better-ui/releases/latest)
2. Run the installer
3. Start rFactor 2 & enjoy

# How to uninstall

Run `Uninstall-Better-UI.exe` located at your rFactor 2 directory

Or

Let Steam re-download modified files: [link](https://support.steampowered.com/kb_article.php?ref=2037-QEUH-3335)

# Features

- add left and right arrow navigation to the main screen
- fix z-index issue with "exit game" button
- add remember password feature to favorite multiplayer servers
- add left and right arrow navigation to the race screen
- add left and right arrow navigation to the garage screen
- fix too big tiles on garage screen
- add permanent chat window below camera view
- highlight current track in setup popup
- disable opacity change animation
- remember selected multiplayer server filters
- add countdown timer to lap limited multiplayer race events

# How to contribute

## Easy way

- Download and install Better-UI version 4+
- Install dependencies: `npm install`
- Start Better-UI: `npm run start`
- Start rFactor 2
- Check WebUI port in your `player.JSON` (rFactor2\UserData\player\player.JSON)
  Find the following:

```json
   "WebUI port": 5396,
   "WebUI port#": "Port for the WebUI",
```

- Open your browser and navigate to http://localhost:<webUiPort>/start/index.html e.g.: http://localhost:5396/start/index.html
- Double-click on version number in the bottom right corner
- Click OK to switch to dev mode
- Now you have a working environment. Feel free to make changes in the code. Then you need to manually refresh the page to see the change

## How to manually patch UI files

- Compile Better ui: `npm run build.all`
- Go to `rFactor 2\Bin\Bundles`
- Open zip archive `net.rfactor2.ui.framework.jar`
- Go to`static\framework`
- Copy here `dist/scripts/better-ui.js`
- Copy `dist/rf2-better-ui` to `rf2-better-ui`
- Edit `main-xxxx.js` file
- Append code at the end: <br>
  ```
  require(["./framework/better-ui"]);
  ```

## How to create an installer

- Install Locate NSIS plugin
- Compile Better ui: `npm run build.all`
- Create directory `dist\installer`
- Use the NSIS compiler (MakeNSISW) to compile `installer/install.nsi`
- The installer will be located at `dist/installer`
