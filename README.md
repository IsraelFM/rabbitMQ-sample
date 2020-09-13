# RabbitMQ-Sample

## Introduction 


A simple application using RabbitMQ and Nodejs, this application was based on the tutorials page on the official RabbitMQ page.

If you understand Portuguese, you can check out the video where I do a step by step creation of this application, please check :) <br>https://youtu.be/ctG2hEc6v_I

## How to Use

Note: you need to have <a href='https://nodejs.org/en/' target='_blank'>NodeJs</a> and <a href='https://docs.docker.com/docker-for-windows/install/' target='_blank'>Docker</a> installed on your computer, if not, please follow the documentation.<br>

First we need to raise our RabbitMQ server using our docker
<br><br>
``docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management`` <br>

Open another terminal and then:
<br>
``npm i``
<br>
``node src/send.js``
<br><br>and again, open another terminal and then:
<br><br>
``node src/receive.js``<br>
