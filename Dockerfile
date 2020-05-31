FROM ubuntu:latest
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y openssh-server
RUN apt-get install -y python3-pip
RUN apt-get install -y curl
RUN apt-get install -y fakechroot
RUN apt-get install -y npm
RUN apt-get install -y rsync
RUN apt-get clean
RUN apt-get autoclean
RUN apt-get autoremove -y
RUN mkdir /home/rahil
RUN mkdir /home/rahil/home
RUN rsync -auz --exclude home / /home/rahil/ || :
RUN echo fakeroot fakechroot chroot /home/rahil >> /etc/ssh/sshrc
RUN mkdir /root/.ssh
COPY sshd_config /root/.ssh/sshd_config
COPY get_keys /usr/local/bin/get_keys
RUN chmod +x /usr/local/bin/get_keys
RUN mkdir /root/app
COPY app.js /root/app/app.js
COPY package.json /root/app/package.json
CMD ["npm", "run", "--prefix", "/root/app", "start"]
