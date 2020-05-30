FROM ubuntu:latest
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y openssh-server
RUN apt-get install npm -y
RUN apt-get install python3-pip -y
RUN apt-get install curl -y
RUN apt-get install zsh -y
RUN apt-get install fonts-powerline -y
RUN apt-get clean && apt-get autoclean && apt-get autoremove -y
RUN mkdir /root/.ssh
COPY authorized_keys /root/.ssh/authorized_keys
COPY sshd_config /root/.ssh/sshd_config
RUN mkdir /root/app
COPY app.js /root/app/app.js
COPY package.json /root/app/package.json
RUN rm /bin/sh && ln -s /bin/zsh /bin/sh
RUN rm /bin/bash && ln -s /bin/zsh /bin/bash
CMD ["zsh", "-c", "npm run --prefix /root/app start"]
