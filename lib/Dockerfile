FROM quay.io/sampandey001/secktor
RUN git clone https://github.com/Thamer1t/RINBOT-Md /root/SamPandey001
WORKDIR /root/SamPandey001/
RUN npm install npm@latest
RUN yarn install --network-concurrency 1
EXPOSE 8000
CMD ["npm", "start"]
