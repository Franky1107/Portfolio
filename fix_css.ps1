$file = 'c:\Users\KIIT\Desktop\New project\style.css'
$lines = [System.IO.File]::ReadAllLines($file)
Write-Host "Original line count: $($lines.Count)"

$newLines = [System.Collections.ArrayList]::new()
for($i = 0; $i -lt $lines.Count; $i++) {
    # Lines are 0-indexed. Line 329 in editor = index 328
    if($i -eq 328) {
        # Replace the base64 background-image with a dark gradient
        [void]$newLines.Add('    background: linear-gradient(135deg, #010d15 0%, #012030 40%, #01283f 100%);')
    }
    elseif($i -ge 329 -and $i -le 331) {
        # Skip background-size, background-position, background-repeat
        continue
    }
    else {
        [void]$newLines.Add($lines[$i])
    }
}

[System.IO.File]::WriteAllLines($file, $newLines.ToArray())
Write-Host "New line count: $($newLines.Count)"
Write-Host "Done!"
