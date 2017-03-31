# OTOSaaS Web Apps

### 注意事项
1. 在develop上新建分支（feature-[功能]）
2. 切换到新的分支上开发
3. 服务测试完成后再合并到develop上
 
---

### 服务名为demo的项目示例

##### 创建服务

```bash
  $ npm run new demo

  测试服务器默认监听9000端口，如需指定端口，则运行：
  $ npm run new demo 20000
```

##### 运行测试

```bash
  $ npm run demo
```
##### 编译项目

```bash
  $ npm run demo_build
```

##### 静态文件输出目录：./dist/demo