#!/bin/bash
#判断package.json文件有无改变，如果改变了需要执行npm install重新安装
md5_old=`cat package.md5`
md5_new=`md5sum package.json |awk '{print $1}'`
if [ "$md5_old" != "$md5_new" ];then
  echo "md5_old=$md5_old,md5_new=$md5_new"
  echo "package.json文件有更新，开始执行npm install"
  echo "$md5_new" > package.md5
  yarn install --production
fi
