### Please check below steps to run application

- run composer file docker-compose.yml using below command
	- 		**docker-compose up --build** 
	- 		It will initialize & run below services 
				- mongodb
				- raqqbitmq
	- 		create login user
				- user name :admin
				- password :admin
	- 		create dummy device with predefined id which used in generate random temperature service

- run composer file docker-compose-devices.yml  using below command
	- 		**docker-compose -f docker-compose-devices.yml up -–build**
	- 		It will initialize & run below services 
				- device manager service (responsible for Device CRUD )
				- device socket services (handle socket operations related to fetch device crud notification from rabbit mq & push to client)
				- client ui

- run composer docker-compose-temperature.yml using below command
	- 		**docker-compose -f docker-compose-temperature.yml up -–build**
	- 		It will initialize & run below services 
				- device  temperature service (responsible for generate random temperature for predefined device-id each N second & push data to rabbit-mq
				- temperature socket service (handle socket operations related to fetch device temperature  notification from rabbit mq & push to client)
- opem  browser using http://localhost:3000/  login with admin/admin

- **used technolgoies**
	- mongodb
	- rabbitmq
	- node-js
	- typescript
	- react-js
	- socket.io
	- docker
	- docker-compose

- repo contain below files
	- postman collections**
 	- [user api postman collection](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/postman-collection/thermostat.user.postman_collection.json)
 	- [device api postman collection](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/postman-collection/thermostat.device.postman_collection.json)
	- diagrams**
      	- [Ui-layer](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/diagrams/Ui-layer.png)
      	- [servcie-layer](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/diagrams/servcie-layer.png)
      	- [service-communication](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/diagrams/service-communication.png)
      	- ![](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/diagrams/service-communication.png)
	- ![](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/diagrams/Ui-layer.png)
	- ![](https://github.com/modyrefy/thermostat.interview/blob/main/project-info/diagrams/servcie-layer.png)


