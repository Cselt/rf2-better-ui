# For this script to use you need to install Locate plugin
# And you need to put 7za.exe to dist\7-zip\7za.exe
;--------------------------------
;Include Modern UI

  !include "MUI2.nsh"

!include LogicLib.nsh
!include "Locate.nsh"
!include nsDialogs.nsh

!define PRODUCT_VERSION "0.0.0"

Name "BetterUI"
ShowInstDetails show

# the file to write
OutFile "..\\dist\\installer\\Better-UI-${PRODUCT_VERSION}.exe"

Var rFLocation
Var steamCmd
Var completedText
Var mainFile
Var unpackedDir
var /global SOURCE
var /global SOURCETEXT

CompletedText $completedText
; --------------------
;Version Information -
; --------------------
LoadLanguageFile "${NSISDIR}\Contrib\Language files\English.nlf"
VIProductVersion "${PRODUCT_VERSION}.0"
VIAddVersionKey /LANG=${LANG_ENGLISH} "ProductName" "Better-UI"
VIAddVersionKey  "OriginalFilename" "Better-UI.exe"
VIAddVersionKey /LANG=${LANG_ENGLISH} "CompanyName" "Cselt"
VIAddVersionKey /LANG=${LANG_ENGLISH} "LegalCopyright" "Copyright Cselt"
VIAddVersionKey /LANG=${LANG_ENGLISH} "FileDescription" "rFactor 2 Better-UI"
VIAddVersionKey /LANG=${LANG_ENGLISH} "FileVersion" "${PRODUCT_VERSION}"
VIAddVersionKey /LANG=${LANG_ENGLISH} "ProductVersion" "${PRODUCT_VERSION}"
VIAddVersionKey /LANG=${LANG_ENGLISH} "InternalName" "Better-UI"
;--------------------------------

;--------------------------------
;Interface Settings

  !define MUI_ABORTWARNING

;--------------------------------
;Pages

  !define MUI_DIRECTORYPAGE_VARIABLE $rFLocation
  !define MUI_PAGE_HEADER_TEXT "APP Installation folder location."
  !define MUI_DIRECTORYPAGE_TEXT_TOP "Please select the folder where rFactor 2 has been installed.  If you are unsure where rFactor 2 has been installed, please keep the default value."
  !define MUI_DIRECTORYPAGE_TEXT_DESTINATION "rFactor 2 location"
  !insertmacro MUI_PAGE_DIRECTORY
  !insertmacro MUI_PAGE_INSTFILES

Function .onInit
  InitPluginsDir

  StrCpy $completedText "Better-UI successfully installed!"
  # read the value from the registry into the $0 register
  SetRegView 64
  ReadRegStr $0 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Steam App 365960" 'InstallLocation'
  StrCpy $rfLocation $0

  # remove tailing "\" OUTDIR is a special parameter, will remove extra slashes
  StrCpy $OUTDIR $rfLocation
  StrCpy $rfLocation $OUTDIR
FunctionEnd

Function FindMainJs
  ${locate::Open} "$unpackedDir\static\framework" "/F=1 /D=0 /M=main*.js /B=1" $0
  StrCmp $0 0 0 found
  MessageBox MB_OK "Did not found" IDOK close

  found:
    ${locate::Find} $0 $1 $2 $3 $4 $5 $6
    DetailPrint "Found file $3"
    StrCpy $mainFile $3

  close:
  ${locate::Close} $0
  ${locate::Unload}
FunctionEnd

Function UnPackJar
  CreateDirectory $rfLocation\Bin\Cache
  SetOutPath $rfLocation\Bin\Cache
  File ..\dist\7-zip\7za.exe
  CopyFiles $rfLocation\Bin\Bundles\net.rfactor2.ui.framework.jar $rfLocation\Bin\Cache

  nsExec::Exec '7za.exe x net.rfactor2.ui.framework.jar -o"$unpackedDir"'
FunctionEnd

Function PatchFiles
  Call FindMainJs

  ExecWait 'find /C "./framework/better-ui" "$unpackedDir\static\framework\$mainFile"' $0

  ${If} $0 > 0
    DetailPrint "Patching main file $unpackedDir\static\framework\$mainFile"
    FileOpen $4 "$unpackedDir\static\framework\$mainFile" a
    FileSeek $4 0 END
    FileWrite $4 'require(["./framework/better-ui"]);'
    FileClose $4
  ${Else}
    DetailPrint "Main file $mainFile already patched"
  ${EndIf}
FunctionEnd

Function AddBetterUI
  DetailPrint "Add Better UI"
  RMDir /r $unpackedDir\static\framework\rf2-better-ui
  CreateDirectory $unpackedDir\static\framework\rf2-better-ui
  SetOutPath $unpackedDir\static\framework\rf2-better-ui
  File /r ..\dist\rf2-better-ui\*

  SetOutPath $unpackedDir\static\framework
  File ..\dist\scripts\better-ui.js
FunctionEnd

Function CreateJarFile
  DetailPrint "Create Jar file"
  SetOutPath $unpackedDir
  nsExec::Exec '..\7za.exe a -r net.rfactor2.ui.framework.jar *.*'
FunctionEnd

Function downloadSteamCmd
  IfFileExists "$steamCmd" done

  DetailPrint "Download SteamCmd"
  CreateDirectory $rfLocation\SteamCmd
  NSISdl::download https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip $rfLocation\SteamCmd\steamcmd.zip
  SetOutPath $rfLocation\SteamCmd
  File ..\dist\7-zip\7za.exe
  nsExec::Exec '7za.exe x steamcmd.zip -o"$rfLocation\SteamCmd"'
  Delete $rfLocation\SteamCmd\steamcmd.zip
  Delete $rfLocation\SteamCmd\7za.exe

  # initialize steam cmd
  DetailPrint "Initialize SteamCmd"
  nsExec::Exec 'steamcmd.exe +quit'

  done:
FunctionEnd

# default section start; every NSIS script has at least one section.
Section
  DetailPrint "rFactor 2 location: $rfLocation"
  StrCpy $unpackedDir $rfLocation\Bin\Cache\out
  StrCpy $steamCmd "$rfLocation\SteamCmd\steamcmd.exe"
  DetailPrint "SteamCmd: $steamCmd"
  DetailPrint "Unpacked dir: $unpackedDir"

  # Delete Cache folder
  RMDir /r $rfLocation\Bin\Cache

  # define the output path for this file
  SetOutPath $rfLocation\Bin\Bundles

  Call downloadSteamCmd
  Call UnpackJar
  Call PatchFiles
  Call AddBetterUI
  Call CreateJarFile

  CopyFiles $unpackedDir\net.rfactor2.ui.framework.jar $rfLocation\Bin\Bundles\

  # Delete Cache folder
  DetailPrint "Cleanup Cache folder"
  RMDir /r $rfLocation\Bin\Cache

  WriteUninstaller "$rfLocation\Uninstall-Better-UI.exe"

# default section end
SectionEnd

# Uninstaller
Section "Uninstall"
  StrCpy $completedText "Better-UI successfully uninstalled!"
  StrCpy $steamCmd "$INSTDIR\SteamCmd\steamcmd.exe"
  DetailPrint "rfLocation: $INSTDIR"
  DetailPrint "SteamCmd: $steamCmd"

  Delete "$INSTDIR\Uninstall-Better-UI.exe"

  DetailPrint "Restoring changes"
  nsExec::Exec '"$steamCmd" +login anonymous +force_install_dir "$INSTDIR" +app_update 400300 validate +quit'

  RMDir /r "$INSTDIR\SteamCmd"
SectionEnd
