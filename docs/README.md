# Blog API

## 用户相关

### 注册
#### URL
> /user/register/
#### 请求方式
> get、post
#### 请求参数
| 参数     | 必填 | 类型   | 说明     |
| -------- | ---- | ------ | -------- |
| name     | true | string | name     |
| password | true | string | password |
| mail     | true | string | mail     |

#### 返回参数

>  无

#### 请求示例

> 无

### 登录

#### URL
> /user/login
#### 请求方式
> get、post
#### 请求参数
| 参数     | 必填 | 类型   | 说明   |
| -------- | ---- | ------ | ------ |
| name     | true | string | 用户名 |
| password | true | string | 密码   |
#### 返回参数
| 参数  | 字段类型 | 说明  |
| ----- | -------- | ----- |
| token | string   | token |
#### 请求示例
```json
{
	"code": 200,
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVpZCI6MSwibmFtZSI6IjEyMzQ1Njc4OSIsInBhc3N3b3JkIjoiMjVmOWU3OTQzMjNiNDUzODg1ZjUxODFmMWI2MjRkMGIiLCJtYWlsIjoiMTkxNTMzNzExN0BxcS5jb20iLCJ1cmwiOm51bGwsInNjcmVlbk5hbWUiOiIxMjM0NTY3ODkiLCJjcmVhdGVUaW1lIjoiMjAxOC0wMy0xM1QwNjoyMzo0Ni4wMDBaIiwiYWN0aXZhdGVkVGltZSI6IjIwMTgtMDMtMTNUMDY6MjM6NDYuMDAwWiIsImxvZ2dlZFRpbWUiOiIyMDE4LTAzLTEzVDA2OjIzOjQ2LjAwMFoiLCJncm91cCI6InVzZXIifSwiZXhwIjoxNTIwOTI4NDYwLCJpYXQiOjE1MjA5MjQ4NjB9.XlRXvvMWvIlP_doLkgG1rYr99Y75fNR09ELKbe-Eu6g"
	},
	"msg": "登录成功",
	"status": "success"
}
```



## 文章相关

### 新建文章

#### URL

> /article/create

#### 请求方式

> get、post

#### 请求参数

| 参数     | 必填  | 类型   | 说明 |
| -------- | ----- | ------ | ---- |
| title    | true  | string | 标题 |
| content  | true  | string | 内容 |
| tags     | false | string | 标签 |
| category | true  | string | 分类 |
| slug     | false | string | 短链 |
| order    | false | int    | 排序 |
| status   | false | string | 状态 |

#### 返回参数

>  无

#### 请求示例

> 无

### 文章详情

#### URL

> /article/details

#### 请求方式

> get、post

#### 请求参数

| 参数 | 必填 | 类型        | 说明   |
| ---- | ---- | ----------- | ------ |
| cid  | true | string，int | 文字id |

#### 返回参数

> 无

#### 请求示例

> 无





