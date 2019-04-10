# LoAconomy

The goal of this small go and react based application is provide a database with items and prices seen all 
over in the world of Legends of Aria.


# Setup

## Container Elasticsearch

Use this docker-compose.yml file to setup two nodes. Further use this snippet to create the corresponding volumes in docker which should point to a directory which must be writeable by the user which runs the container


`docker volume create --name=esdata2  -o type=none -o device=/home/loaconomy/elasticsearch/data2 -o o=bind && docker volume create --name=esdata1  -o type=none -o device=/home/loaconomy/elasticsearch/data1 -o o=bind`

curl -XPUT 127.0.0.1:9200/items -H 'Content-Type: application/json' -d @itemsIndex.json

*Note: we could use a docker/docker compose plugin to achive this automatically*

## Container Loaconomy


