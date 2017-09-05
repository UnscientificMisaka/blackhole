usage = "\
Usage:          make <option> \n\n\
OPTION          DESCRIPTION \n\
----------------------------\n\
* install         安装依赖\n\
* start           启动本地开发服务, 需要全局安装pm2 \n\
* stop            中止运行 \n\
"

default:
	@echo $(usage)

install:
	npm install

start:
	pm2 start ./index.js --watch

stop:
	pm2 kill