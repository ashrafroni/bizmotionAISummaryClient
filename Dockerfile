FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV API_BASE_URL=""

ENTRYPOINT ["/entrypoint.sh"]