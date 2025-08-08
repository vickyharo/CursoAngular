@SETLOCAL EnableDELayedExpansion
@SET DEBUG=false
@IF NOT {%DEBUG%}=={true} ECHO OFF

REM **************************************************
REM 			Agregar al post build del proyecto
REM **************************************************
REM ClearReferences.cmd "$(TargetDir)" "$(TargetName)"

REM **************************************************
REM 			CONFIGURO DIRECTORIO
REM **************************************************
SET RUTACMD=%~dp0
PUSHD %RUTACMD%

REM **************************************************
REM 			Obtengo parametros
REM **************************************************
SET TargetDir=%~1
SET TargetName=%~2

if {"%Targetdir%"}=={""} (
	ECHO No se especifico el directorio de salida.
	EXIT /b 1
)

if {"%TargetName%"}=={""} (
	ECHO No se especifico el nombre de salida.
	EXIT /b 1
)

ECHO TargetDir: %Targetdir%
ECHO TargetName: %TargetName%

REM **************************************************
REM 		Elimino Librerias Vendor
REM **************************************************
ECHO Eliminado directorios de compilacion innecesarios.
RMDIR /q/s "%TargetDir%refs"
RMDIR /q/s "%TargetDir%runtimes"
RMDIR /q/s "%TargetDir%cs"
RMDIR /q/s "%TargetDir%de"
RMDIR /q/s "%TargetDir%es"
RMDIR /q/s "%TargetDir%fr"
RMDIR /q/s "%TargetDir%it"
RMDIR /q/s "%TargetDir%ja"
RMDIR /q/s "%TargetDir%ko"
RMDIR /q/s "%TargetDir%pl"
RMDIR /q/s "%TargetDir%pt-BR"
RMDIR /q/s "%TargetDir%ref"
RMDIR /q/s "%TargetDir%ru"
RMDIR /q/s "%TargetDir%tr"
RMDIR /q/s "%TargetDir%zh-Hans"
RMDIR /q/s "%TargetDir%zh-Hant"
RMDIR /q/s "%TargetDir%clidriver"
	
ECHO Eliminado archivos de compilacion innecesarios.
DEL "%TargetDir%Antlr4.Runtime.dll"  
DEL "%TargetDir%AutoMapper.dll" 
DEL "%TargetDir%Bansi.Practices*.dll"
DEL "%TargetDir%CrystalDecisions*.dll" 
DEL "%TargetDir%DocumentFormat*.dll"
DEL "%TargetDir%Humanizer*.dll"
DEL "%TargetDir%IBM*.dll"
DEL "%TargetDir%Microsoft*.dll"
DEL "%TargetDir%Newtonsoft.Json*.dll"
DEL "%TargetDir%Swashbuckle.AspNetCore*.dll" 
DEL "%TargetDir%System*.dll"
DEL "%TargetDir%dotnet-aspnet**.dll"
DEL "%TargetDir%sni.dll" 

REM **************************************************
REM 		Elimino Librerias Bansi
REM **************************************************
ECHO Eliminado archivos de bansi de compilacion innecesarios.
DEL "%TargetDir%Bansi.Application*.dll"
DEL "%TargetDir%Bansi.AspNetCore*.dll"
DEL "%TargetDir%Bansi.Collections*.dll"
DEL "%TargetDir%Bansi.ComponentMoDEL*.dll"
DEL "%TargetDir%Bansi.Configuration*.dll"
DEL "%TargetDir%Bansi.Data*.dll"
DEL "%TargetDir%Bansi.Diagnostics*.dll"
DEL "%TargetDir%Bansi.Drawing*.dll"
DEL "%TargetDir%Bansi.EntityFrameworkCore*.dll"
DEL "%TargetDir%Bansi.Extensions*.dll"
DEL "%TargetDir%Bansi.Linq*.dll"
DEL "%TargetDir%Bansi.Net*.dll"
DEL "%TargetDir%Bansi.Reflection*.dll"
DEL "%TargetDir%Bansi.Reporting*.dll"
DEL "%TargetDir%Bansi.Runtime*.dll"
DEL "%TargetDir%Bansi.Security*.dll"
DEL "%TargetDir%Bansi.ServiceModel*.dll"
DEL "%TargetDir%Bansi.System*.dll"
DEL "%TargetDir%Bansi.Text*.dll"
DEL "%TargetDir%Bansi.Threading*.dll"
DEL "%TargetDir%Bansi.UtilGlob*.dll"
DEL "%TargetDir%Bansi.Web*.dll"
DEL "%TargetDir%Bansi.Win32*.dll"
DEL "%TargetDir%Bansi.Windows*.dll"
DEL "%TargetDir%Bansi.Windows*.dll"


REM Elimino librerias
DEL "%TargetDir%Bansi.Reflection*.dll"
DEL "%TargetDir%Bansi.Reflection.AssemblyBindings.depsresolver.json"
DEL "%TargetDir%vendor.depsresolver.json"

REM LIBRERIAS ADICIONALES
DEL "%TargetDir%Bansi.Grpc*.dll"
DEL "%TargetDir%EntityFramework*.dll"
DEL "%TargetDir%Google*.dll"
DEL "%TargetDir%Grpc*.dll"
DEL "%TargetDir%protobuf*.dll"

REM Copiar json	
ECHO Copiando archivo de dependencias.
%SYSTEMROOT%\SYSTEM32\XCOPY /y "references.deps.json" "%TargetDir%%TargetName%.deps.json"
ECHO Eliminado directorio Connected Services.
RMDIR /Q/S "%TargetDir%\Connected Services"

POPD