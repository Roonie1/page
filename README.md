# page

jquery 分页插件
![image](https://github.com/Roonie1/page/blob/master/images/demo.png)
## 使用方法 

```
  $(".page").page({
      totalPage:10,//总共页数
      currentPage:1,//当前第几页
      pageUrl:function(page){
          return "url"+page;//异步请求的接口
      },
      callback:function(data){
          console.log(data);//请求返回来的json数据
      }
  });
```
