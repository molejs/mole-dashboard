FROM nginx
COPY . /usr/share/nginx/html

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update &&\
    apt-get install -y apt-utils
RUN apt-get install -y curl &&\
    curl --silent --location https://deb.nodesource.com/setup_4.x | bash - &&\
    apt-get install -y nodejs

WORKDIR /usr/share/nginx/html

RUN npm install &&\
    npm run build