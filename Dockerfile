FROM ubuntu:latest
RUN apt-get update
RUN apt-get install -y openssh-server
RUN apt-get install npm -y
RUN apt-get install build-essential -y
RUN apt-get install nano -y
RUN apt-get install vim -y
RUN apt-get install sudo -y
RUN apt-get clean && apt-get autoclean && apt-get autoremove -y
RUN echo "%dyno	ALL=(ALL:ALL) ALL" > /etc/sudoers.d/dyno
RUN mkdir /root/.ssh
COPY authorized_keys /root/.ssh/authorized_keys
COPY sshd_config /root/.ssh/sshd_config
RUN mkdir /root/app
COPY app.js /root/app/app.js
COPY package.json /root/app/package.json
COPY package-lock.json /root/app/package-lock.json
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
CMD ["npm", "run", "--prefix", "/root/app", "start"]
