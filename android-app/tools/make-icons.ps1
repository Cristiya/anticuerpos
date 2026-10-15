param([string]$OutDir)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Force $OutDir | Out-Null

$teal  = [System.Drawing.Color]::FromArgb(255, 0x0E, 0x85, 0x74)
$white = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)

# Virus de la marca: cuerpo circular + 8 espigas con punta redonda (mismo dibujo que el icono de la cabecera)
function New-Icon([int]$size, [bool]$withBackground, [double]$scale, [string]$path){
  $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.PixelOffsetMode = 'HighQuality'
  if($withBackground){ $g.Clear($teal) } else { $g.Clear([System.Drawing.Color]::Transparent) }
  $u = $size / 1024.0 * $scale
  $cx = $size / 2.0; $cy = $size / 2.0
  $brush = New-Object System.Drawing.SolidBrush($white)
  $pen = New-Object System.Drawing.Pen($white, [single](56*$u))
  $pen.StartCap = 'Round'; $pen.EndCap = 'Round'
  # espigas
  foreach($k in 0..7){
    $a = [math]::PI/4*$k
    $x1 = $cx + [math]::Cos($a)*215*$u; $y1 = $cy + [math]::Sin($a)*215*$u
    $x2 = $cx + [math]::Cos($a)*335*$u; $y2 = $cy + [math]::Sin($a)*335*$u
    $g.DrawLine($pen, [single]$x1, [single]$y1, [single]$x2, [single]$y2)
    $r = 46*$u; $x3 = $cx + [math]::Cos($a)*350*$u; $y3 = $cy + [math]::Sin($a)*350*$u
    $g.FillEllipse($brush, [single]($x3-$r), [single]($y3-$r), [single](2*$r), [single](2*$r))
  }
  # cuerpo
  $R = 205*$u
  $g.FillEllipse($brush, [single]($cx-$R), [single]($cy-$R), [single](2*$R), [single](2*$R))
  $g.Dispose(); $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
}

# Icono completo (sin transparencia): tienda, PWA y Android antiguo
New-Icon 1024 $true 0.92 (Join-Path $OutDir 'icon-only.png')
New-Icon 512  $true 0.92 (Join-Path $OutDir 'icon-512.png')
New-Icon 192  $true 0.92 (Join-Path $OutDir 'icon-192.png')
# Icono adaptativo de Android: capa de fondo y capa de primer plano (el glifo cabe en la zona segura, 66 %)
New-Icon 1024 $true  0.0 (Join-Path $OutDir 'icon-background.png')
New-Icon 1024 $false 0.74 (Join-Path $OutDir 'icon-foreground.png')
Get-ChildItem $OutDir -Filter *.png | Select-Object Name, Length
