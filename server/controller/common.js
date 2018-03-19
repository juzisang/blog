const CommentsModel = require('../model').Comment

class CommonController {

  /**
   * 获取最近评论
   */
  async getRecentComments (ctx) {
    const size = ctx.getParams('size')
    if (!size) {
      return ctx.error('size is null')
    }
    const query = {
      limit: size,
      order: 'utime DESC'
    }
    return await CommentsModel.findAll(query)
  }
}

module.exports = new CommonController()