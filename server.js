//  首先在命令行cd到当前项目所在目录，接着在其中生成npm项目npm init -y，命令行窗口会显示项目信息
// 然后在命令行窗口中输入npm install express载入express依赖
const express = require('express');//在node应用中载入express
const app = express();//建立一个express实例
const expressPort=3000;//指定一个端口，端口号
// 使用listen进行监听//传入（端口号，回调函数），在成功进行监听后对一个函数告诉用户服务器在运行了
app.listen(expressPort,() => {
   console.log("running……on" + expressPort);
   })
// 接下来告诉服务器端口在接收到get请求后返回一个什么样的结果
// 参数（聆听地址，回调函数）,在回调函数中获得3个参数（req,res,next）、

// 静态文件的托管
app.use('/static',express.static('public'));
// app.use(express.static('public'));//use用法2，其中第一个参数是一个虚拟文件地址，它把静态文件的实际地址映射到express实际应用中的地址
// express.static(path.join(__dirname, 'public'))
// const path = require('path');
// app.use(express.static(path.join(__dirname, 'public')))
// 这里使用虚拟地址时，在index引入文件时也要加上虚拟地址/public
// 虚拟地址的好处，就是在有多个静态文件夹的时候，引入的时候就需要多个use语句引入多个静态文件夹

app.get('/',(req,res,next)=>{
   // 使用send方法做出反馈
   // res.send("hello word");
   // 返回一个页面文件,${__dirname}两个下划线用来获得当前js文件所在地址（是个绝对地址），注：不是静态文件的不能被请求到，所以需要在前面使用use方法将public下文件都变成静态文件
   // res.sendFile('${__dirname}/public/index.html')//D:\Users\wsngodv\Desktop\qianduan\项目\2048\2048v1.2\public\index.html
   res.sendFile(__dirname +'/public/index.html')//需要绝对路径
})
