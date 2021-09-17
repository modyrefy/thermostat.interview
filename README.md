Please check below steps to run application
1.	run composer file docker-compose.yml using below command
	docker-compose up --build 
	It will initialize & run below services 
•	mongo db  
•	raqqbitmq 
•	create login user
o	user name :admin
o	passwaord
•	create dummy device with predefined id which used in generate random temperature service

2.	run composer file docker-compose-devices.yml  using below command
docker-compose -f docker-compose-devices.yml up –build
It will initialize & run below services 
•	device manager service (responsible for Device CRUD )
•	device socket services (handle socket operations related to fetch device crud notification from rabbit mq & push to client)
•	client ui
3.	run composer docker-compose-temperature.yml using below command
docker-compose -f docker-compose-temperature.yml up –build
It will initialize & run below services 
•	device  temperature service (responsible for generate random temperature for predefined device-id each N second & push data to rabbit-mq
•	temperature socket service (handle socket operations related to fetch device temperature  notification from rabbit mq & push to client)
repo contain below files 
•	user api postman collection 
•	device api postman collection
•	


