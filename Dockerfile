FROM ubuntu:latest
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y openssh-server
RUN apt-get install -y python3-pip
RUN apt-get install -y curl
RUN apt-get install -y fakechroot
RUN apt-get install -y npm
RUN apt-get clean && apt-get autoclean && apt-get autoremove -y
RUN mkdir /root/.ssh
COPY authorized_keys /root/.ssh/authorized_keys
COPY sshd_config /root/.ssh/sshd_config
RUN mkdir /root/app
COPY app.js /root/app/app.js
COPY package.json /root/app/package.json
CMD ["npm", "run", "--prefix", "/root/app", "start"]
