# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]
## Added
- Exit button to installing content dialog

## Fixed
- Add quit button on hash location change
- Change button order in quit dialog

## [3.0.0]
## Added
- Uninstaller (comes with SteamCmd)
- Display unlimited number of favorite servers on race screen
- Do not display popup while loading favorite servers on race screen
- Increase visible content size on garage view

### Fixed
- Remember server filters in multiplayer view
- Load Better-UI code more reliably
- Apply patches again when hash location changes on

## [2.4.1]
### Fixed
- use FontAwesome coming with rF
- do not ask user for path if location was not found in registry

## [2.4.0]
### Added
- Exit popup to navbar
- Let the user select rFactor 2 location in the installer

### Fixed
- update password event if it was wrong

## [2.3.2] - 2021-01-10
### Added
- Installer generated via Github Actions

### Fixed
- Ask user to enter rFactor 2 location if it's not found in registry

## [2.3.1] - 2021-01-20
### Changed
- Modified installer to pick official jar file and patch with Better-UI

## [2.3.0] - 2021-01-19
### Added
- Installer
- Support latest rFactor2 release

## [2.2.0] - 2021-01-19
### Added
- Add countdown timer to lap limited multiplayer race events
- Support latest rFactor2 release

## [2.1.0] - 2021-01-10
### Added
- Remember selected server filters

### Fixed
- Display rf-chat on tab change
- Fix server admin commands in rf-chat

## [2.0.1] - 2021-01-09

### Fixed
- Update saved password on input value change

## [2.0.0] - 2021-01-08

### Added
- Highlight current track in setup popup
- Disable opacity change animation

### Changed
- Removed jQuery scripts and started to use Angular to manipulate with DOM

### Fixed

- Chat window will scroll down if you are scrolled to the bottom
- Opponent selector highlights current selection after navigated to other tab and back
