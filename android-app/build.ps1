# Compila el AAB (Google Play) y el APK (pruebas) de Anticuerpos.
#
# Uso, desde una ruta CORTA (p. ej. C:\dev\anticuerpos), no desde una carpeta muy anidada:
#   powershell -ExecutionPolicy Bypass -File .\android-app\build.ps1
#
# Requisitos: ver android-app\README.md (Node, JDK 21 y Android SDK 36).
param(
  [string]$JavaHome   = "",
  [string]$AndroidSdk = "C:\Android\sdk"
)
$ErrorActionPreference = 'Stop'
$here = $PSScriptRoot
$repo = Split-Path -Parent $here

# Ejecuta un programa externo. En Windows PowerShell 5.1 los avisos que npm y Gradle escriben por la salida
# de errores se convertirian en errores fatales; aqui solo cuenta el codigo de salida.
function Invoke-Tool([string]$Name, [scriptblock]$Command) {
  $old = $ErrorActionPreference; $ErrorActionPreference = 'Continue'
  try { & $Command 2>&1 | ForEach-Object { "$_" } } finally { $ErrorActionPreference = $old }
  if ($LASTEXITCODE -ne 0) { throw "$Name fallo (codigo $LASTEXITCODE)" }
}

# --- comprobaciones previas ---
if ($here.Length -gt 90) {
  throw "La ruta '$here' es demasiado larga y Gradle fallara en Windows. Clona el repo en una ruta corta (p. ej. C:\dev\anticuerpos)."
}
if (-not $JavaHome) {
  $cand = Get-ChildItem "C:\Program Files\Eclipse Adoptium" -Directory -ErrorAction SilentlyContinue | Where-Object { $_.Name -like 'jdk-21*' } | Select-Object -First 1
  if ($cand) { $JavaHome = $cand.FullName } elseif ($env:JAVA_HOME) { $JavaHome = $env:JAVA_HOME }
}
if (-not $JavaHome -or -not (Test-Path "$JavaHome\bin\java.exe")) { throw "No encuentro un JDK 21. Instalalo (winget install EclipseAdoptium.Temurin.21.JDK) o pasa -JavaHome." }
if (-not (Test-Path "$AndroidSdk\platforms\android-36")) { throw "Falta el Android SDK 36 en '$AndroidSdk'. Mira el README (seccion Requisitos)." }

$env:JAVA_HOME = $JavaHome; $env:ANDROID_HOME = $AndroidSdk; $env:ANDROID_SDK_ROOT = $AndroidSdk
$env:Path = "$JavaHome\bin;" + $env:Path
$npm = (Get-Command npm.cmd -ErrorAction SilentlyContinue)
if (-not $npm) { throw "No encuentro Node.js/npm. Instala Node LTS (winget install OpenJS.NodeJS.LTS)." }

# --- 1. copiar la web (la unica fuente de verdad es la raiz del repo) ---
$www = Join-Path $here 'www'
if (Test-Path $www) { Remove-Item -Path $www -Recurse -Force }
New-Item -ItemType Directory -Force -Path "$www\icons" | Out-Null
foreach ($f in 'index.html','i18n.js','app.js','styles.css','manifest.webmanifest','firebase-config.js') { Copy-Item -Path (Join-Path $repo $f) -Destination (Join-Path $www $f) -Force }
foreach ($f in 'icon-192.png','icon-512.png') { Copy-Item -Path (Join-Path $repo "icons\$f") -Destination (Join-Path $www "icons\$f") -Force }

# --- 2. dependencias y sincronizacion de Capacitor ---
Push-Location $here
try {
  if (-not (Test-Path (Join-Path $here 'node_modules'))) { Invoke-Tool 'npm ci' { npm ci } }
  Invoke-Tool 'cap sync' { npx cap sync android }

  # --- 3. Gradle ---
  Set-Content -Path (Join-Path $here 'android\local.properties') -Value ("sdk.dir=" + ($AndroidSdk -replace '\\','\\' -replace ':','\:')) -Encoding ascii
  $signed = Test-Path (Join-Path $here 'android\keystore.properties')
  if (-not $signed) { Write-Warning "No hay android\keystore.properties: el release saldra SIN FIRMAR y Google Play no lo aceptara. Mira el README." }
  Push-Location (Join-Path $here 'android')
  try {
    Invoke-Tool 'Gradle' { .\gradlew.bat --no-daemon bundleRelease assembleRelease }
  } finally { Pop-Location }

  # --- 4. recoger los artefactos ---
  $gradle = Get-Content (Join-Path $here 'android\app\build.gradle') -Raw
  $vn = [regex]::Match($gradle, 'versionName "([^"]+)"').Groups[1].Value
  $vc = [regex]::Match($gradle, 'versionCode (\d+)').Groups[1].Value
  $out = Join-Path $here 'salida'
  New-Item -ItemType Directory -Force -Path $out | Out-Null
  $base = "Anticuerpos-$vn-versionCode$vc"
  Copy-Item -Path (Join-Path $here 'android\app\build\outputs\bundle\release\app-release.aab') -Destination "$out\$base.aab" -Force
  $apkRel = Join-Path $here 'android\app\build\outputs\apk\release'
  $apk = Get-ChildItem $apkRel -Filter '*.apk' | Select-Object -First 1
  Copy-Item -Path $apk.FullName -Destination "$out\$base.apk" -Force
  Write-Host ""
  Write-Host "Listo ($(if ($signed) {'firmado'} else {'SIN FIRMAR'})):" -ForegroundColor Green
  Get-ChildItem $out | Select-Object Name, @{n='MB';e={[math]::Round($_.Length/1MB,2)}} | Format-Table -AutoSize
} finally { Pop-Location }
