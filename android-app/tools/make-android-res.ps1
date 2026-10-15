param([string]$Res)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$teal  = [System.Drawing.Color]::FromArgb(255, 0x0E, 0x85, 0x74)
$white = [System.Drawing.Color]::FromArgb(255, 255, 255, 255)

function New-Glyph([int]$size, [string]$shape, [double]$scale, [string]$path){
  $bmp = New-Object System.Drawing.Bitmap($size, $size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'; $g.PixelOffsetMode = 'HighQuality'
  $g.Clear([System.Drawing.Color]::Transparent)
  $tb = New-Object System.Drawing.SolidBrush($teal)
  if($shape -eq 'rounded'){
    $r = $size*0.22; $gp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $gp.AddArc(0,0,2*$r,2*$r,180,90); $gp.AddArc($size-2*$r,0,2*$r,2*$r,270,90)
    $gp.AddArc($size-2*$r,$size-2*$r,2*$r,2*$r,0,90); $gp.AddArc(0,$size-2*$r,2*$r,2*$r,90,90); $gp.CloseFigure()
    $g.FillPath($tb,$gp)
  } elseif($shape -eq 'circle'){ $g.FillEllipse($tb,0,0,$size-1,$size-1) }
  $u = $size / 1024.0 * $scale; $cx = $size/2.0; $cy = $size/2.0
  $brush = New-Object System.Drawing.SolidBrush($white)
  $pen = New-Object System.Drawing.Pen($white, [single](56*$u)); $pen.StartCap='Round'; $pen.EndCap='Round'
  foreach($k in 0..7){
    $a=[math]::PI/4*$k
    $g.DrawLine($pen,[single]($cx+[math]::Cos($a)*215*$u),[single]($cy+[math]::Sin($a)*215*$u),[single]($cx+[math]::Cos($a)*335*$u),[single]($cy+[math]::Sin($a)*335*$u))
    $rr=46*$u; $x3=$cx+[math]::Cos($a)*350*$u; $y3=$cy+[math]::Sin($a)*350*$u
    $g.FillEllipse($brush,[single]($x3-$rr),[single]($y3-$rr),[single](2*$rr),[single](2*$rr))
  }
  $R=205*$u; $g.FillEllipse($brush,[single]($cx-$R),[single]($cy-$R),[single](2*$R),[single](2*$R))
  $g.Dispose(); $bmp.Save($path,[System.Drawing.Imaging.ImageFormat]::Png); $bmp.Dispose()
}

$legacy = @{ mdpi=48; hdpi=72; xhdpi=96; xxhdpi=144; xxxhdpi=192 }
$fore   = @{ mdpi=108; hdpi=162; xhdpi=216; xxhdpi=324; xxxhdpi=432 }
foreach($d in $legacy.Keys){
  $dir = Join-Path $Res "mipmap-$d"
  New-Glyph $legacy[$d] 'rounded' 0.92 (Join-Path $dir 'ic_launcher.png')
  New-Glyph $legacy[$d] 'circle'  0.80 (Join-Path $dir 'ic_launcher_round.png')
  New-Glyph $fore[$d]   'none'    0.74 (Join-Path $dir 'ic_launcher_foreground.png')
}
# logo del splash (se dibuja centrado, sin escalar, sobre el verde)
New-Item -ItemType Directory -Force -Path (Join-Path $Res 'drawable-nodpi') | Out-Null
New-Glyph 512 'none' 0.90 (Join-Path $Res 'drawable-nodpi\splash_logo.png')
"ok"
