# Script para configurar DNS de agendaplus.automatizasur.cl (FIXED)
$apiToken = "ewfbYK9Jzodn_oWcHMnYo1TyyImEZbnqAbcGiFNB"
$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Content-Type" = "application/json"
}

# Paso 1: Obtener Zone ID de automatizasur.cl
Write-Host "Searching Zone ID for automatizasur.cl..." -ForegroundColor Cyan
try {
    $zonesResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones?name=automatizasur.cl" -Headers $headers -Method Get
    if (-not $zonesResponse.success) { throw "Cloudflare API Error: $($zonesResponse.errors)" }
    $zoneId = $zonesResponse.result[0].id
    Write-Host "Zone ID found: $zoneId" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# Paso 2: Verificar si ya existe el registro agendaplus
Write-Host "`nVerifying existing DNS records..." -ForegroundColor Cyan
$dnsRecords = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records?name=agendaplus.automatizasur.cl" -Headers $headers -Method Get

$recordBody = @{
    type = "CNAME"
    name = "agendaplus"
    content = "agenda-plus.pages.dev"
    ttl = 1
    proxied = $false
} | ConvertTo-Json

if ($dnsRecords.result.Count -gt 0) {
    Write-Host "Record 'agendaplus' exists. Updating..." -ForegroundColor Yellow
    $recordId = $dnsRecords.result[0].id
    $updateResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$recordId" -Headers $headers -Method Put -Body $recordBody
    if ($updateResponse.success) {
        Write-Host "DNS record updated successfully!" -ForegroundColor Green
    } else {
        Write-Host "Error updating record: $($updateResponse.errors)" -ForegroundColor Red
    }
} else {
    Write-Host "Creating new DNS record..." -ForegroundColor Cyan
    $createResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records" -Headers $headers -Method Post -Body $recordBody
    if ($createResponse.success) {
        Write-Host "DNS record created successfully!" -ForegroundColor Green
    } else {
        Write-Host "Error creating record: $($createResponse.errors)" -ForegroundColor Red
    }
}

Write-Host "`nConfiguration completed!" -ForegroundColor Green
Write-Host "Site will be at: https://agendaplus.automatizasur.cl" -ForegroundColor Cyan
