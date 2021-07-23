FROM node:14.16.0-alpine3.13
LABEL pipelineName="asset_health_analyzer_oc_frontend" \
      pipelineKey="QJMYWWBC" \
      offeringKey="CSZMZMXN"

RUN echo 'http://dl-3.alpinelinux.org/alpine/v3.13/main' >> /etc/apk/repositories
RUN apk upgrade

EXPOSE 3000

COPY . .
WORKDIR /app
RUN ls -al
RUN yarn install

#Fix for CVE-2019-13173, CVE-2020-8116 and NODE-SECURITY-1184
RUN rm -rf /usr/local/lib/node_modules/npm/node_modules/fstream \ 
      /usr/local/lib/node_modules/npm/node_modules/https-proxy-agent \
      /usr/local/lib/node_modules/npm/node_modules/dot-prop \
      /usr/local/lib/node_modules/npm/node_modules/ssri \
      /usr/local/lib/node_modules/npm/node_modules/y18n

RUN adduser node root

RUN chmod -R 775 /app
RUN chown -R node:root /app

USER node
CMD ["npm","start"]