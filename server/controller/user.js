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
    const rules = {
      name: {type: 'string', required: true},
      password: {type: 'string', required: true},
      mail: {type: 'email', required: true}
    }
    await util.validate(rules, ctx.getParams())
      .then(async (params) => await UserModel.findOne({where: {mail: params.mail}}) ? Promise.reject('用户已存在') : params)
      .then(async ({name, screenName = name, password, mail}) => await UserModel.create({
        name,
        screenName: name,
        password: md5(password),
        mail
      }))
      .then(data => ctx.success({uid: data.uid}, '创建成功'))
      .catch(err => ctx.error(err))
  }

  /**
   * 登录
   * @param ctx = ctx.getParams()
   * @param ctx.name
   * @param ctx.password
   * @returns {Promise<void>}
   */
  async login (ctx) {
    const rules = {
      mail: {type: 'email', required: true},
      password: {type: 'string', required: true}
    }
    await util.validate(rules, ctx.getParams())
      .then(async params => {
        const user = await UserModel.findOne({where: {mail: params.mail}})
        if (!user) {
          return Promise.reject(new ctx.StatusError('用户不存在'))
        }
        return {
          user,
          params
        }
      })
      .then(async ({params, user}) => {
        if (user.mail !== params.mail || user.password !== md5(params.password)) {
          return Promise.reject(new ctx.StatusError('用户名或密码错误', 403))
        }
        return user.uid
      })
      .then(async (uid) => jwt.sign({user: uid, exp: 1000 * 60 * 60 * 24 * 20}, config.app.jwt))
      .then(token => ctx.success({token}, '登录成功'))
      .catch(err => ctx.error(err))
  }

  /**
   * 获取所有用户信息
   */
  async all (ctx) {
    const users = await UserModel.findAll({attributes: {exclude: ['password']}})
    ctx.success(users)
  }

  /**
   * 获取当前用户的详情
   */
  async userInfo (ctx) {
    const userId = ctx.state['user'].user
    const user = await UserModel.findById(userId, {
      attributes: {
        exclude: ['password']
      }
    })
    if (!user) {
      return ctx.error('用户不存在')
    }
    ctx.success(user)
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
    const rules = {
      uid: {type: 'string', required: true},
      name: {type: 'string', required: true},
      mail: {type: 'email', required: true},
      url: {type: 'url', required: true},
      screenName: {type: 'string', required: true, transform: (value) => value ? value : params.name}
    }
    const updateUser = async ({uid, name, mail, url, screenName = name}) => await UserModel.update(
      {uid, name, mail, url, screenName},
      {
        where: {
          uid
        }
      })
    await util.validate(rules, ctx.getParams())
      .then(async params => await UserModel.findById(params.uid) ? params : Promise.reject(new ctx.StatusError('用户不存在', 404)))
      .then(async params => await updateUser(params))
      .then(() => ctx.success(null, '修改成功'))
      .catch(err => ctx.error(err))
  }
}

module.exports = new UserController()
