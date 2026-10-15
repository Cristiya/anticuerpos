# Anticuerpos para Android

Envoltorio [Capacitor](https://capacitorjs.com/) de la web del juego. La app Android lleva dentro los archivos
de la web (`index.html`, `app.js`, `styles.css`, ...), que se copian desde la **raíz de este repositorio**.
El juego online sigue usando Firebase por Internet.

- ID de paquete: `com.cristiya.anticuerpos` (no se puede cambiar una vez publicada en Play)
- SDK mínimo 24 (Android 7), destino 36
- Salida: un **AAB** (lo que se sube a Google Play) y un **APK** (para probar en el móvil)

## Lo que NO está en el repositorio (a propósito)

| Qué | Por qué |
|---|---|
| `keystore/anticuerpos-upload.jks` y su contraseña | Es la clave de subida de Google Play. No se puede regenerar. **Guarda una copia fuera de este equipo.** |
| `android/keystore.properties` | Contiene las contraseñas de la clave. |
| `android/local.properties` | Ruta local del SDK (la crea `build.ps1`). |

Están en `.gitignore`. Si algún día se subieran por error, hay que **cambiar la clave de subida** desde Play Console.

## Requisitos (Windows)

1. Node.js LTS: `winget install OpenJS.NodeJS.LTS`
2. **JDK 21**: `winget install EclipseAdoptium.Temurin.21.JDK` (Capacitor 8 no compila con Java 17)
3. Android SDK en `C:\Android\sdk` (o pasa `-AndroidSdk`) con:
   - herramientas de línea de comandos de Google (`cmdline-tools\latest`)
   - `platform-tools`, `platforms;android-36` y `build-tools;36.0.0`
   ```
   sdkmanager --sdk_root=C:\Android\sdk "platform-tools" "platforms;android-36" "build-tools;36.0.0"
   ```
   Tendrás que aceptar la *Licencia del SDK de Android* de Google (lo pide `sdkmanager`).
4. Clona el repositorio en una **ruta corta** (p. ej. `C:\dev\anticuerpos`). Con rutas muy largas Gradle falla en Windows.

## Compilar

```
powershell -ExecutionPolicy Bypass -File .\android-app\build.ps1
```

Deja `Anticuerpos-<versión>-versionCode<n>.aab` y `.apk` en `android-app\salida\`. La primera vez tarda varios
minutos (Gradle se descarga a sí mismo y sus dependencias).

## Firmar (necesario para Google Play)

1. Crea la clave de subida **una sola vez** (guarda el `.jks` y la contraseña en un sitio seguro):
   ```
   keytool -genkeypair -v -keystore C:\ruta\segura\anticuerpos-upload.jks -alias anticuerpos-upload ^
     -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Crea `android-app\android\keystore.properties` (no se sube a git):
   ```
   storeFile=C:/ruta/segura/anticuerpos-upload.jks
   storePassword=...
   keyAlias=anticuerpos-upload
   keyPassword=...
   ```
3. Vuelve a ejecutar `build.ps1`. Sin ese archivo el release sale **sin firmar** y Play no lo acepta.

Comprobar la firma del resultado:
```
apksigner verify --verbose --print-certs android-app\salida\Anticuerpos-...apk
```

## Publicar una actualización

1. Cambia la web en la raíz del repositorio como siempre.
2. En `android\app\build.gradle` sube `versionCode` (1, 2, 3, ...; Play no admite repetirlo) y ajusta `versionName`.
3. Ejecuta `build.ps1` y sube el `.aab` en Play Console.

La app Android **no se actualiza sola** con la web: lleva una copia dentro, así que cada cambio de la web exige
una versión nueva en Play.

## Iconos

El icono es el virus de la marca en blanco sobre el verde `#0E8574`.

- `tools\make-icons.ps1 -OutDir <carpeta>` genera `icon-192.png`, `icon-512.png` (los de la web, en `..\icons`) y las capas del icono adaptativo.
- `tools\make-android-res.ps1 -Res android\app\src\main\res` regenera los iconos del lanzador y el logo del splash.

## Notas

- Las tipografías (Google Fonts) y las librerías de Firebase se descargan de servidores de Google al abrir la app; está recogido en la [política de privacidad](../privacidad.html).
- Política de privacidad pública: https://cristiya.github.io/anticuerpos/privacidad.html
