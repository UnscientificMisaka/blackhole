#!/bin/sh
sql="db.createCollection('$1')"
echo $sql | mongo blackhole