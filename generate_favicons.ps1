Add-Type -AssemblyName System.Drawing
$sourceFilePath = "C:\Users\Workstation\.gemini\antigravity\brain\18fa31fe-1c91-4ee0-9622-c17c9b864671\cybersecurity_engineer_logo_1773650057126.png"
$targetDir = "c:\Users\Workstation\Github\yusufarbc\static\images\favicons"
New-Item -ItemType Directory -Force -Path $targetDir

function Resize-Image {
    param($size, $name)
    $sourceImage = [System.Drawing.Image]::FromFile($sourceFilePath)
    $targetImage = New-Object System.Drawing.Bitmap($size, $size)
    $graphics = [System.Drawing.Graphics]::FromImage($targetImage)
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.DrawImage($sourceImage, 0, 0, $size, $size)
    $targetImage.Save("$targetDir\$name", [System.Drawing.Imaging.ImageFormat]::Png)
    $graphics.Dispose()
    $targetImage.Dispose()
    $sourceImage.Dispose()
}

Resize-Image 16 "favicon-16x16.png"
Resize-Image 32 "favicon-32x32.png"
Resize-Image 180 "apple-touch-icon.png"
Resize-Image 192 "android-chrome-192x192.png"
Resize-Image 512 "android-chrome-512x512.png"

# Copy 32x32 to root as favicon.ico (renamed png is usually fine for modern browsers)
Copy-Item "$targetDir\favicon-32x32.png" "c:\Users\Workstation\Github\yusufarbc\static\favicon.ico"
