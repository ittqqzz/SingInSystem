# NodeJS 开发签到系统
## 项目简介
> 本项目采用 Node.js，结合 MySQL 数据库开发了一个签到系统
>
> 主要用途为监管本实验室成员来实验室学习的次数与时长
- 采用 Bootstarp 作为前端框架，通过 Ajax 与后台交互数据
- 项目采用模块化开发方式，针对不同业务需求制定不同的 api 以及路由
- MySQL 数据库字段的设计详见 db 目录下的 sql 文件
## 项目技术要点
- express 框架
- swig 模板引擎
- body-parser
- express-session
- mysql
- BootStrap
## 项目截图
- 首页
![Image text](https://gitee.com/ittqqzz/myPictureWarehouse/raw/master/signinsystem/home.png)
- 登录
![Image text](https://gitee.com/ittqqzz/myPictureWarehouse/raw/master/signinsystem/signin.png)
- 签到主界面
![Image text](https://gitee.com/ittqqzz/myPictureWarehouse/raw/master/signinsystem/admin.png)
- 签到成功
![Image text](https://gitee.com/ittqqzz/myPictureWarehouse/raw/master/signinsystem/signinsuccess.png)
- 退出登录
![Image text](https://gitee.com/ittqqzz/myPictureWarehouse/raw/master/signinsystem/singout.png)
## 部署流程
- 安装 MySQL，用户名 root，密码 0000
- 安装 Node.js 以及 npm
- 进入本项目所在目录，找到 db 目录下的 sql 文件，导入到你的数据库中
- 在 app.js 所在目录下启动命令行工具，输入 node app.js 回车即可启动项目
- 然后访问命令行工具提示的地址：http://localhost:3000/
