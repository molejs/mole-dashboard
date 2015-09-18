FROM nginx
COPY . /usr/share/nginx/html

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -qq &&\
    apt-get install -qqy apt-utils &&\
    apt-get install -qqy curl &&\
    curl --silent --location https://rpm.nodesource.com/setup | bash - &&\
    apt-get install -qqy nodejs npm

WORKDIR /usr/share/nginx/html

RUN npm install &&\
    npm run build