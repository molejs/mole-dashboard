FROM nginx
COPY . /usr/share/nginx/html

RUN curl --silent --location https://rpm.nodesource.com/setup | bash - &&\
    yum -y install nodejs npm

WORKDIR /usr/share/nginx/html

RUN npm install &&\
    npm run build