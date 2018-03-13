const md5 = require('md5')
const config = require('../config')
const util = require('../util/util')
const UserModel = require('../model').Users

/**
 * 注册
 * @param ctx = ctx.getParams()
 * @param ctx.name
 * @param ctx.password
 * @param ctx.mail
 * @returns {Promise<void>}
 */
async function register (ctx) {
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
    ctx.success({id: data.uid}, '用户创建成功')
  }
}

/**
 * 登录
 * @param ctx = ctx.getParams()
 * @param ctx.name
 * @param ctx.password
 * @returns {Promise<void>}
 */
async function login (ctx) {
  try {
    const params = ctx.getParams()
    await util.validate({
      name: {type: 'string', required: true},
      password: {type: 'string', required: true}
    }, params)
    let users = await UserModel.findAll({where: {name: params.name}})
    if (users.length === 0) {
      throw new Error('用户不存在')
    }
    const user = users[0].dataValues
    if (user.name !== params.name) {
      throw new Error('用户名错误')
    } else if (user.password !== md5(params.password)) {
      throw new Error('密码错误')
    }
    ctx.session.user = Object.assign({}, user)
    delete user.password
    ctx.success(user, '登录成功')
  } catch (e) {
    console.error(e)
    ctx.error(e)
  }
}

/**
 * 获取所有用户信息
 */
async function all (ctx) {
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
async function details (ctx) {
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
async function edit (ctx) {
  const params = ctx.getParams()
  try {
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
  } catch (e) {
    ctx.error(e)
  }
}

module.exports = {
  register,
  login,
  all,
  details,
  edit
}
