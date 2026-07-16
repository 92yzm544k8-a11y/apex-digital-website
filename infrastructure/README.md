# Backend Infrastructure — Eryon

Este directorio contiene los recursos de infraestructura para el backend del sitio.

## Prerequisitos

- [AWS CLI](https://aws.amazon.com/cli/) instalado y configurado (`aws configure`)
- Acceso a AWS con permisos para crear DynamoDB, SES y CloudFormation

## Setup Rápido

```bash
# 1. Autentícate en AWS
aws login

# 2. Ejecuta el setup (por defecto: production)
bash infrastructure/setup.sh

# O para staging:
bash infrastructure/setup.sh staging
```

## Qué hace el script

1. **CloudFormation**: Crea las tablas DynamoDB (`eryon-contact-production`, `eryon-analytics-production`) con PAY_PER_REQUEST (sin costo fijo)
2. **SES**: Envía un correo de verificación a `eryon.mx@outlook.com` — debes hacer clic en el enlace para activar el envío de notificaciones
3. **Genera environment variables**: Imprime las variables que debes configurar en AWS Amplify Console

## Variables de Entorno en Amplify Console

En tu app de AWS Amplify, ve a **Hosting → Environment variables** y agrega:

| Variable | Valor | Obligatoria |
|---|---|---|
| `DYNAMODB_CONTACT_TABLE` | eryon-contact-production | Sí |
| `DYNAMODB_ANALYTICS_TABLE` | eryon-analytics-production | Sí |
| `SES_FROM_EMAIL` | eryon.mx@outlook.com | Sí (para notificaciones) |
| `SES_NOTIFY_EMAIL` | eryon.mx@outlook.com | Sí (para notificaciones) |
| `ADMIN_API_KEY` | (generada por setup.sh) | Sí (protege /admin) |

## Admin Dashboard

Una vez configurado, visita `https://tudominio/admin` e ingresa el `ADMIN_API_KEY` para ver:
- Analytics del sitio (vistas por página, por día)
- Solicitudes de contacto recibidas

## Stack de Recursos AWS

| Recurso | Tipo | Costo |
|---|---|---|
| `eryon-contact-{env}` | DynamoDB (PAY_PER_REQUEST) | ~$0 (tráfico bajo) |
| `eryon-analytics-{env}` | DynamoDB (PAY_PER_REQUEST) | ~$0 (tráfico bajo) |
| SES email identity | Verificación de email | $0 (1000 emails/mes gratis) |
