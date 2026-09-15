#!/bin/sh
set -e

echo "🔧 Generating runtime config from environment variables..."
envsubst < /usr/share/nginx/html/assets/config.template.json > /usr/share/nginx/html/assets/config.json
echo "Config generated!"

# Call the original Nginx entrypoint to ensure
# scripts in /docker-entrypoint.d/ run as expected
echo "Running original Nginx entrypoint..."
/docker-entrypoint.sh nginx -g 'daemon off;'