#制定node镜像的版本，即构建镜像的基础源镜像
FROM node:8.9-alpine
#声明作者
LABEL maintainer="zl"
#移动当前目录下的本地文件到镜像中的app目录下
ADD . /app/
#进入到app目录下面，类似cd
WORKDIR /app
#安装依赖
RUN npm install
#对外暴露的端口
EXPOSE 3000
#程序启动脚本
CMD ["npm", "start"]