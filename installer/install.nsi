# name the installer
OutFile "..\\dist\\installer\\Better-UI.exe"

Var rFLocation
Var backupDir

# default section start; every NSIS script has at least one section.
Section

# read the value from the registry into the $0 register
SetRegView 64
ReadRegStr $0 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Steam App 365960" 'InstallLocation'
StrCpy $rfLocation $0
DetailPrint "rFactor 2 location: $rfLocation"

# define the output path for this file
SetOutPath $rfLocation\Bin\Bundles

# First create a backup
StrCpy $backupDir $rfLocation\Bin\Backup
DetailPrint "Creating backups in folder: $backupDir"
CreateDirectory $backupDir
CopyFiles $rfLocation\Bin\Bundles\net.rfactor2.ui.framework.jar $backupDir

# define what to install and place it in the output path
File ..\dist\jar\*.jar

# default section end
SectionEnd
