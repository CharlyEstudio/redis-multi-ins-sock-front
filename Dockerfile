FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get -qq install apache2
RUN apt-get update && apt-get install -y apache2-utils
RUN apt-get update && apt-get install libc-ares2
RUN apt-get update && apt-get install libuv1
RUN apt-get update && apt-get install libnode64
RUN apt-get update && apt install -y nodejs
RUN apt-get update && apt-get install nodejs-doc
RUN apt-get update && apt install -y npm
RUN apt-get clean
EXPOSE 80
RUN npm install -g @angular/cli
WORKDIR /var/www
COPY package.json /var/www/package.json
COPY package-lock.json /var/www/package-lock.json
RUN npm ci
COPY . /var/www
RUN npm run build
RUN mv ./html ../
RUN cd ..
RUN rm -rf www
RUN mkdir www
RUN cd www
RUN mv ../html .
RUN npm uninstall @angular/cli
