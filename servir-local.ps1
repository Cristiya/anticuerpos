# Sirve esta carpeta en http://localhost:8791 para probar la app en el navegador
# (Add to Home Screen solo funciona con un sitio publicado en HTTPS real, esto es solo para pruebas).
# Uso: clic derecho > "Ejecutar con PowerShell", o desde una terminal:
#   powershell -ExecutionPolicy Bypass -File .\servir-local.ps1

$root = $PSScriptRoot
$port = 8791
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Sirviendo $root en http://localhost:$port/  (Ctrl+C para detener)"

$mime = @{
  ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript";
  ".json"="application/json"; ".webmanifest"="application/manifest+json";
  ".png"="image/png"; ".svg"="image/svg+xml"; ".ico"="image/x-icon"
}

while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $req = $ctx.Request
  $res = $ctx.Response
  try {
    $path = $req.Url.AbsolutePath.TrimStart('/')
    if ([string]::IsNullOrEmpty($path)) { $path = "index.html" }
    $full = Join-Path $root $path
    if (Test-Path $full -PathType Leaf) {
      $ext = [System.IO.Path]::GetExtension($full)
      $ct = $mime[$ext]
      if (-not $ct) { $ct = "application/octet-stream" }
      $bytes = [System.IO.File]::ReadAllBytes($full)
      $res.ContentType = $ct
      $res.ContentLength64 = $bytes.Length
      $res.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $res.StatusCode = 404
      $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found: $path")
      $res.OutputStream.Write($msg, 0, $msg.Length)
    }
  } catch {
    $res.StatusCode = 500
  } finally {
    $res.OutputStream.Close()
  }
}
