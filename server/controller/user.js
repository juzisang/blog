const md5 = require('md5')
const config = require('../config')
const util = require('../util/util')
const UserModel = require('../model').Users
const jwt = require('jsonwebtoken')

class UserController {
  /**
   * 注册
   * @param ctx = ctx.getParams()
   * @param ctx.name
   * @param ctx.password
   * @param ctx.mail
   * @returns {Promise<void>}
   */
  async register (ctx) {
    const params = ctx.getParams()

    let validate = util.validate({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true},
      mail: {type: 'email', required: true}
    }, params)

    let {name, password, mail} = await validate
    let user = await UserModel.findAll({where: {mail}})
    if (user.length) {
      ctx.error('用户已存在', 400)
    } else {
      let data = await UserModel.create({name, screenName: name, password: md5(password), mail})
      ctx.success(null, '用户创建成功')
    }
  }

  /**
   * 登录
   * @param ctx = ctx.getParams()
   * @param ctx.name
   * @param ctx.password
   * @returns {Promise<void>}
   */
  async login (ctx) {
    const params = ctx.getParams()
    await util.validate(
      {
        name: {type: 'string', required: true},
        password: {type: 'string', required: true}
      }, params)
    let user = await UserModel.findOne({where: {name: params.name}})
    if (!user) {
      throw new Error('用户不存在')
    }
    if (user.name !== params.name || user.password !== md5(params.password)) {
      throw new Error('用户名或密码错误')
    }
    // 生成Token
    const token = jwt.sign({
      user: user,
      exp: Math.floor(Date.now() / 1000) + (60 * 60)
    }, config.app.jwt)

    ctx.success({
      token
    }, '登录成功')
  }

  /**
   * 获取所有用户信息
   */
  async all (ctx) {
    const users = await UserModel.findAll({attributes: {exclude: ['password']}})
    users.forEach(item => delete item.password)
    ctx.success(users)
  }

  /**
   * 获取指定用户的信息
   * @param ctx = ctx.getParams()
   * @param ctx.id
   * @returns {Promise<void>}
   */
  async details (ctx) {
    const params = ctx.getParams()

    if (params.id) {
      const user = await UserModel.findById(params.id, {attributes: {exclude: ['password']}})
      if (user) {
        ctx.success(user)
      } else {
        ctx.error('用户不存在')
      }
    } else {
      ctx.error('id为必填')
    }

  }

  /**
   * 编辑
   * @param ctx = ctx.getParams()
   * @param ctx.uid
   * @param ctx.name
   * @param ctx.mail
   * @param ctx.url
   * @param ctx.screenName
   * @returns {Promise<void>}
   */
  async edit (ctx) {
    const params = ctx.getParams()
    const {uid, name, mail, url, screenName} = await util.validate({
      uid: {type: 'string', required: true},
      name: {type: 'string', required: true},
      mail: {type: 'email', required: true},
      url: {type: 'url', required: true},
      screenName: {type: 'string', required: true, transform: (value) => value ? value : params.name}
    }, params)

    if (await UserModel.findById(params.uid)) {
      await UserModel.update(
        {uid, name, mail, url, screenName},
        {
          where: {
            uid: params.uid
          }
        })
      ctx.success(params, '更新成功')
    } else {
      throw new Error('用户不存在')
    }
  }
}

module.exports = new UserController()
