# WeappDemo
微信小程序个人示例程序    
appKey:wxba8299c52a991281    

## 内容
- 微信组件及api 使用方法
- 下拉更新数据、上拉加载更多 及 无限旋转的加载中动画实现
- 访问聚合数据 历史上的今天接口 设计并实现列表页、详情页
- 集成talkingdata的tdweapp.js并做部分修改 测试大数据采集方案
- 添加 **Promise** 支持，避免魔鬼式回调

## 常用色值
![色值图片][1]
     
##  历史上的今天 界面展示    
![home][2] ![todayList][3] ![todayDetail][4]

## Tips    
- {{}} 会先于页面渲染 执行，image标签 src中链接可以部分是计算出来然后拼接的      
- target指代 触发事件的源组件；currentTarget指代 事件绑定的当前组件。 在外层view绑定的事件 想要响应内层view的事件 必须使用currentTarget才能正常得到传递的数据


[1]:https://raw.githubusercontent.com/tianqing2117/WeappDemo/master/screenshots/color.jpg    
[2]:https://raw.githubusercontent.com/tianqing2117/WeappDemo/master/screenshots/home.png    
[3]:https://raw.githubusercontent.com/tianqing2117/WeappDemo/master/screenshots/todayList.png     
[4]:https://raw.githubusercontent.com/tianqing2117/WeappDemo/master/screenshots/todayDetail.png