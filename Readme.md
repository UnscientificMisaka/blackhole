# BlackHole

> 大哥亲自命名的黑洞，目的是收集大哥的打包工具xxx的使用信息，但并不对数据进行分析，只是存储。

## TODO
* [x] 自动化建表
* [ ] 自动路由，简单接口
* [ ] 多个项目工具等收集数据等聚合统计分析
* [ ] 每个IP一天限制1000条

## Features
* 获取数据需要校验token
* 获取数据默认日期最近1000条，可输入日期查询不同时间段的
* 存储数据一个IP一天限制50条

## API Docs
* /api/collect/:table GET
* /api/collect/:table POST

## LICENSE
MIT