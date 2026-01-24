# Script para configurar DNS de agendaplus.automatizasur.cl
$apiToken = "ewfbYK9Jzodn_oWcHMnYo1TyyImEZbnqAbcGiFNB"
$headers = @{
    "Authorization" = "Bearer $apiToken"
    "Content-Type" = "application/json"
}

# Paso 1: Obtener Zone ID de automatizasur.cl
Write-Host "🔍 Buscando Zone ID de automatizasur.cl..." -ForegroundColor Cyan
$zonesResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones?name=automatizasur.cl" -Headers $headers -Method Get
$zoneId = $zonesResponse.result[0].id
Write-Host "✅ Zone ID encontrado: $zoneId" -ForegroundColor Green

# Paso 2: Verificar si ya existe el registro agendaplus
Write-Host "`n🔍 Verificando registros DNS existentes..." -ForegroundColor Cyan
$dnsRecords = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records?name=agendaplus.automatizasur.cl" -Headers $headers -Method Get

if ($dnsRecords.result.Count -gt 0) {
    Write-Host "⚠️  Registro 'agendaplus' ya existe. Actualizando..." -ForegroundColor Yellow
    $recordId = $dnsRecords.result[0].id
    
    # Actualizar registro existente
    $updateBody = @{
        type = "CNAME"
        name = "agendaplus"
        content = "agenda-plus.pages.dev"
        ttl = 1
        proxied = $false
    } | ConvertTo-Json
    
    $updateResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records/$recordId" -Headers $headers -Method Put -Body $updateBody
    
    if ($updateResponse.success) {
        Write-Host "✅ Registro DNS actualizado exitosamente!" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al actualizar: $($updateResponse.errors)" -ForegroundColor Red
    }
} else {
    Write-Host "📝 Creando nuevo registro DNS..." -ForegroundColor Cyan
    
    # Crear nuevo registro
    $createBody = @{
        type = "CNAME"
        name = "agendaplus"
        content = "agenda-plus.pages.dev"
        ttl = 1
        proxied = $false
    } | ConvertTo-Json
    
    $createResponse = Invoke-RestMethod -Uri "https://api.cloudflare.com/client/v4/zones/$zoneId/dns_records" -Headers $headers -Method Post -Body $createBody
    
    if ($createResponse.success) {
        Write-Host "✅ Registro DNS creado exitosamente!" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al crear: $($createResponse.errors)" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Configuración completada!" -ForegroundColor Green
Write-Host "🌐 Tu sitio estará disponible en: https://agendaplus.automatizasur.cl" -ForegroundColor Cyan
Write-Host "⏱️  Espera 2-5 minutos para la propagación DNS" -ForegroundColor Yellow
