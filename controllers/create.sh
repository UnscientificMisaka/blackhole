#!/bin/sh
sql =
"db.createCollection('$1');
db.'$1'.insert({ip:'',content:''})"
echo $sql | mongo blackhole