# generate-design-tokens.ps1
# Parse DESIGN.md and inject tokens into Angular/Vue theme files
param(
    [Parameter(Mandatory=$true)] [string]$DesignMdPath,
    [Parameter(Mandatory=$true)] [string]$Framework,
    [Parameter(Mandatory=$true)] [string]$OutputPath
)

function Parse-DesignMd($path) {
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    $lines = $content -split "\r?\n"
    $tokens = @{ colors = @{}; typography = @{}; rounded = @{}; spacing = @{} }
    $section = $null; $subSection = $null
    foreach ($line in $lines) {
        $trimmed = $line.Trim()
        if ($trimmed -match '''^colors:''') { $section = '''colors'''; $subSection = $null; continue }
        if ($trimmed -match '''^typography:''') { $section = '''typography'''; $subSection = $null; continue }
        if ($trimmed -match '''^rounded:''') { $section = '''rounded'''; $subSection = $null; continue }
        if ($trimmed -match '''^spacing:''') { $section = '''spacing'''; $subSection = $null; continue }
        if ($trimmed -match '''^components:''') { $section = $null; continue }
        if (-not $section) { continue }
        if ($section -eq '''typography''' -and $trimmed -match '''^(\S[\w-]+):''') { $subSection = $Matches[1]; $tokens.typography[$subSection] = @{}; continue }
        if ($trimmed -match '''^(\S[\w-]+):\s*"?(.+?)"?$''') {
            $key = $Matches[1]; $value = $Matches[2].Trim('''"''').Trim()
            if ($section -eq '''colors''') { $tokens.colors[$key] = $value }
            elseif ($section -eq '''rounded''') { $tokens.rounded[$key] = $value }
            elseif ($section -eq '''spacing''') { $tokens.spacing[$key] = $value }
            elseif ($section -eq '''typography''' -and $subSection) { $tokens.typography[$subSection][$key] = $value }
        }
    }
    return $tokens
}

function Get-Val($hash, $key, $default) {
    if ($hash.ContainsKey($key)) { return $hash[$key] }
    return $default
}

$tokens = Parse-DesignMd $DesignMdPath
$c = $tokens.colors; $t = $tokens.typography; $r = $tokens.rounded; $s = $tokens.spacing
$targetContent = if (Test-Path $OutputPath) { [System.IO.File]::ReadAllText($OutputPath, [System.Text.Encoding]::UTF8) } else { '''''' }
$startMarker = '''// === DESIGN_TOKENS_AUTO_START ==='''
$endMarker = '''// === DESIGN_TOKENS_AUTO_END ==='''