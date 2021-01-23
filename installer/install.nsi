# For this script to use you need to install Locate plugin
# And you need to put 7za.exe to dist\7-zip\7za.exe
!include LogicLib.nsh
!include "Locate.nsh"
!include nsDialogs.nsh

!define PRODUCT_VERSION "0.0.0"

Name "BetterUI"
ShowInstDetails show
CompletedText "Better-UI successfully installed!"

# the file to write
OutFile "..\\dist\\installer\\Better-UI-${PRODUCT_VERSION}.exe"

Var rFLocation
Var mainFile
Var unpackedDir
var /global SOURCE
var /global SOURCETEXT

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

Function .onInit
  InitPluginsDir

  # read the value from the registry into the $0 register
  SetRegView 64
  ReadRegStr $0 HKLM "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Steam App 365960" 'InstallLocation'
  StrCpy $rfLocation $0

  # if it's not found then ask the user to pick rF location
  StrCmp $rfLocation "" getRfPath done

  getRfPath:
    nsDialogs::SelectFolderDialog "Select rFactor 2 Folder" "c:\"
    pop $rfLocation
    ${NSD_SetText} $SOURCETEXT $rfLocation

  done:
    # remove tailing "\" OUTDIR is a special paramter, will remove extra slashes
    StrCpy $OUTDIR $rfLocation
    StrCpy $rfLocation $OUTDIR

    StrCpy $unpackedDir $rfLocation\Bin\Cache\out
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

# default section start; every NSIS script has at least one section.
Section
  DetailPrint "rFactor 2 location: $rfLocation"
  # Delete Cache folder
  RMDir /r $rfLocation\Bin\Cache

  # define the output path for this file
  SetOutPath $rfLocation\Bin\Bundles

  Call UnpackJar
  Call PatchFiles
  Call AddBetterUI
  Call CreateJarFile

  CopyFiles $unpackedDir\net.rfactor2.ui.framework.jar $rfLocation\Bin\Bundles\

  # Delete Cache folder
  DetailPrint "Cleanup Cache folder"
  RMDir /r $rfLocation\Bin\Cache

# default section end
SectionEnd
