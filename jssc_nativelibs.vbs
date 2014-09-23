Option Explicit
Dim PROJECT_FOLDER, PRIVATE_FOLDER, OUTPUT_FOLDER, JAVA_HOME, JSSC_FOLDER, VER, SYSTEMS, ARCHS
PROJECT_FOLDER = Expand("%USERPROFILE%\Documents\GitHub\qz-print\")
PRIVATE_FOLDER = Expand("%USERPROFILE%\Desktop\Code Signing\")
JAVA_HOME = Expand("%PROGRAMFILES%\Java\jdk1.5.0_22\")
JSSC_FOLDER = PROJECT_FOLDER & "jssc_2.8.0_qz\src\libs\"
OUTPUT_FOLDER = PROJECT_FOLDER & "qz-print\dist\"
VER = "2.8"
SYSTEMS = Array("linux", "mac_os_x", "windows")
ARCHS = Array("x86", "x86_64")

Dim id, ks, kp, sp, tsa
id = GetProperty(PRIVATE_FOLDER & "private.properties", "jnlp.signing.alias")
ks = GetProperty(PRIVATE_FOLDER & "private.properties", "jnlp.signing.keystore")
kp = GetProperty(PRIVATE_FOLDER & "private.properties", "jnlp.signing.keypass")
tsa = GetProperty(PRIVATE_FOLDER & "private.properties", "jnlp.signing.tsaurl")
sp = GetProperty(PRIVATE_FOLDER & "private.properties", "jnlp.signing.storepass")

MakeZips
SignToJars id, ks, kp, tsa, sp

Function SignToJars(id, ks, kp, tsa, sp)
	Dim oShell, params, jarfile
	params = ""
	Set oShell = CreateObject("Shell.Application")
	jarfile = OUTPUT_FOLDER & "windows_x86.zip"
	params = params & "-keystore " & ks
	params = params & " -storepass " & sp
	params = params & " -keypass " & kp
	params = params & " -signedjar " & CHR(34) & jarfile & ".jar" & CHR(34)
	params = params & " -tsa " & tsa
	params = params & " " & CHR(34) & jarfile & CHR(34)
	params = params & " " & id
	InputBox "", "", params
	oShell.ShellExecute JAVA_HOME & "bin\jarsigner.exe", params, OUTPUT_FOLDER
	'Dim oFSO, oFile
	'Set oFSO = CreateObject("Scripting.FileSystemObject")
	'For Each oFile in oFSO.GetFolder(OUTPUT_FOLDER).Files
'		If oFSO.GetExtensionName(oFile) = "zip" Then
'			oFSO.MoveFile oFile.Path, OUTPUT_FOLDER & oFSO.GetFileName(oFile) & ".jar"
		'End If
	'Next
End Function

Function MakeZips()
	Dim oFSO, oFolder, oFile, arch
	Set oFSO = CreateObject("Scripting.FileSystemObject")
	For Each oFolder in oFSO.GetFolder(JSSC_FOLDER).SubFolders
		If InArray(oFolder.Name, SYSTEMS) Then
			For Each oFile In oFolder.Files
				For Each arch In ARCHS 
					If InStr(oFile.Name, arch) > 0 AND InStr(oFile.Name, VER) > 0 Then
						' WScript.Echo oFile.Path & ":" & OUTPUT_FOLDER & oFile.Name & ".zip"
						MakeZip oFile.Path, OUTPUT_FOLDER & oFolder.Name & "_" & arch & ".zip"
					End if
				Next
			Next
		End If
	Next
End Function

' WScript.Echo id & ", " & ks & ", " & kp & ", " & ", " & tsa & ", " & sp

' Read a value from a Java properties file
Function GetProperty(iniFile, lineContains)
	Dim oFSO, listFile, fName
	Set oFSO = CreateObject("Scripting.FileSystemObject")
	Set listFile = oFSO.OpenTextFile(iniFile)
	Do Until listFile.AtEndOfStream
		fName = listFile.ReadLine
		If InStr(fName, lineContains) > 0 Then
			Dim prop
			prop = Trim(Mid(fName, InStr(fName, "=") +1, Len(fName)))
			'prop = Trim()(1))
			' Fix slashes
			prop = Replace(prop, "/", "\")
			' Fix ant variable
			prop = Replace(prop, "${user.home}", "%USERPROFILE%")
			GetProperty = CHR(34) & Expand(prop) & CHR(34)
			Exit Function
		Else
			GetProperty = ""
		End If
	Loop
End Function

' Expand environmental variables
Function Expand(path) 
	Dim oWSH
	Set oWSH = WScript.CreateObject("WScript.Shell")
	Expand = oWSH.ExpandEnvironmentStrings(path)
	Set oWSH = Nothing
End Function

Sub MakeZip (sFolder, zipFile)
    With CreateObject("Scripting.FileSystemObject")
        zipFile = .GetAbsolutePathName(zipFile)
        sFolder = .GetAbsolutePathName(sFolder)

        With .CreateTextFile(zipFile, True)
            .Write Chr(80) & Chr(75) & Chr(5) & Chr(6) & String(18, chr(0))
        End With
    End With


    With CreateObject("Shell.Application")
        .NameSpace(zipFile).CopyHere sFolder

        Do Until .NameSpace(zipFile).Items.Count = _
                 1
            WScript.Sleep 1000 
        Loop
		
'		Dim extraFile, counter
'		counter = 0
'		For Each extraFile in ADDITIONAL_FILES
'			With CreateObject("Scripting.FileSystemObject")
'				extraFile = .GetAbsolutePathName(extraFile)
'			End With
'			.NameSpace(zipFile).CopyHere extraFile
'			counter = counter + 1
'			Do Until .NameSpace(zipFile).Items.Count = counter + 1
'				WScript.Sleep 1000
'			Loop
'		Next
		
    End With

End Sub

Function InArray(item,arr)
     Dim i
     For i=0 To UBound(arr) Step 1
         If LCase(arr(i)) = LCase(item) Then
             InArray=True
             Exit Function
         End If
     Next
     InArray=False
 End Function
