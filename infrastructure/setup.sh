#!/usr/bin/env bash
set -euo pipefail

echo "=== Eryon Infrastructure Setup ==="

# --- Configuration ---
ENVIRONMENT="${1:-production}"
STACK_NAME="eryon-backend-${ENVIRONMENT}"
REGION="${AWS_REGION:-us-east-1}"

echo "Environment: ${ENVIRONMENT}"
echo "Stack:       ${STACK_NAME}"
echo "Region:      ${REGION}"
echo ""

# --- 1. Deploy CloudFormation ---
echo ">>> Deploying CloudFormation stack..."
aws cloudformation deploy \
  --region "${REGION}" \
  --stack-name "${STACK_NAME}" \
  --template-file cloudformation.yaml \
  --parameter-overrides "Environment=${ENVIRONMENT}" \
  --capabilities CAPABILITY_IAM \
  --no-fail-on-empty-changeset

CONTACT_TABLE=$(aws cloudformation describe-stacks \
  --region "${REGION}" \
  --stack-name "${STACK_NAME}" \
  --query "Stacks[0].Outputs[?OutputKey=='ContactTableName'].OutputValue" \
  --output text)

ANALYTICS_TABLE=$(aws cloudformation describe-stacks \
  --region "${REGION}" \
  --stack-name "${STACK_NAME}" \
  --query "Stacks[0].Outputs[?OutputKey=='AnalyticsTableName'].OutputValue" \
  --output text)

echo "Contact table:   ${CONTACT_TABLE}"
echo "Analytics table: ${ANALYTICS_TABLE}"
echo ""

# --- 2. Verify SES email ---
echo ">>> Verifying SES email identity..."
SES_EMAIL="${SES_EMAIL:-eryon.mx@outlook.com}"
aws ses verify-email-identity --region "${REGION}" --email-address "${SES_EMAIL}" 2>/dev/null || true
echo "Verification email sent to ${SES_EMAIL}. You must click the link in that email."
echo ""

# --- 3. Output env vars for Amplify ---
echo "============================================"
echo "  SET THESE ENVIRONMENT VARIABLES IN AMPLIFY"
echo "============================================"
echo ""
echo "DYNAMODB_CONTACT_TABLE=${CONTACT_TABLE}"
echo "DYNAMODB_ANALYTICS_TABLE=${ANALYTICS_TABLE}"
echo "SES_FROM_EMAIL=${SES_EMAIL}"
echo "SES_NOTIFY_EMAIL=${SES_EMAIL}"
echo "ADMIN_API_KEY=$(openssl rand -hex 32)"
echo ""
echo "============================================"
echo "Setup complete!"
