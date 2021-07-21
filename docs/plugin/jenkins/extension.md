# Jenkins一键构建
::: tip 提示
Jenkins是一款开源 CI&CD(持续集成与持续交付 https://www.jianshu.com/p/735306fe5794 ) 软件，用于自动化各种任务，包括构建、测试和部署软件。

Jenkins 支持各种运行方式，可通过系统包、Docker 或者通过一个独立的 Java 程序。

:::

## 一、Jenkins配置
## 1.安装插件

### (1)Node.js插件

   安装: 系统管理 > 插件管理 (NodeJS Plugin)

   * 第一步:

   <img :src="$withBase('/jenkins/node1.jpg')">
   
   * 第二步:

   <img :src="$withBase('/jenkins/node.jpg')">

   配置NodeJS插件 : 系统管理 > 工具配置

   * 第一步:

   <img :src="$withBase('/jenkins/nodeSet1.jpg')">
   
   * 第二步:
   
   <img :src="$withBase('/jenkins/nodeSet.jpg')">

### (2)Publish Over SSH插件
   
   安装:  系统管理 > 插件管理 (Publish Over SSH)

   <img :src="$withBase('/jenkins/ssh.jpg')">
   
   配置远程服务器的用户名密码: 系统管理 > 系统设置，找到Publish over SSH这一栏

   <img :src="$withBase('/jenkins/sshSet1.jpg')">
   <img :src="$withBase('/jenkins/sshSet2.jpg')">

## 2.创建任务
``` bash
  流程: 
  从git仓库拉去代码
  安装前端代码相关依赖
  将前端代码进行打包
  将打包好的前端代码复制到相应的服务器目录
  前端代码部署完成
```
### (1)构建一个自由风格的软件项目：

  <img :src="$withBase('/jenkins/plan1.jpg')">

### (2)源码管理, 添加Git代码仓库

<img :src="$withBase('/jenkins/plan2.jpg')">

### (3)添加凭据

<img :src="$withBase('/jenkins/pinju.jpg')">

private的文件地址: 

<img :src="$withBase('/jenkins/private.jpg')">

### (4)构建环境,选择Provide Node

<img :src="$withBase('/jenkins/plan3.jpg')">

### (5) 构建

<img :src="$withBase('/jenkins/plan4.jpg')">

``` bash
#!/bin/bash
cd ./easy-word-welfare-new
node -v
npm -v
npm install
npm run build
cd dist
rm -rf dist.tar.gz
tar -zcvf dist.tar.gz ./*
```

### (6) 构建后操作

传输文件到另一台服务器

<img :src="$withBase('/jenkins/plan5.jpg')">

## 3.一键构建

<img :src="$withBase('/jenkins/gou1.jpg')">

## 二、Jenkins安装
## 1.依赖环境

(1)JavaSDK（Java SE Development Kit）
在终端命令行输入java -version命令，如果打印出java版本，则代表已安装，可以略过此步骤。
如果没有安装过，进入JavaSDK官网，接受协议，选择 & 下载对应系统的 安装包
``` bash
JavaSDK官网: https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html
```
## 2.Jenkins的安装

（1）下载Jenkins（最为简单的安装方法, 下载一个war文件）

``` bash
  下载链接: http://mirrors.jenkins.io/war-stable/latest/jenkins.war
```

（2）cmd运行：
``` bash
  启动jenkins:
    java -jar jenkins.war --enable-future-java --httpPort=9999
  重启Jenkins:
    http://localhost:9999/restart
  重载Jenkins配置信息:
    http://localhost:9999/reload
```
运行成功,进入jenkins设置页 : http://localhost:9999, 按照提示操作设置就行





