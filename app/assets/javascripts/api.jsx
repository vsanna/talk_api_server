var $ = require('jquery')

class API {
  // ES6ではクラス内にprops持てない
  static API_PREFIX () { return '/api/' }

  static get (path, params) {
    return this.api('GET', path, params)
  }

  static post (path, params) {
    return this.api('POST', path, params)
  }

  static postWithFile (path, params) {
    return this.apiWithFile('POST', path, params)
  }

  static put (path, params) {
    return this.api('PUT', path, params)
  }

  static delete (path, params) {
    return this.api('DELETE', path, params)
  }

  static api (type, path, params) {
    return $.ajax({
      type,
      'headers': {
        'X-CSRF-Token': `${this.getRailsToken()}`
      },
      'url': this.API_PREFIX() + this.modifyPath(path),
      'dataType': 'json',
      'data': params
    })
  }

  static apiWithFile (type, path, params) {
    return $.ajax({
      type,
      'headers': {
        'X-CSRF-Token': `${this.getRailsToken()}`
      },
      'url': this.API_PREFIX() + this.modifyPath(path),
      'dataType': 'json', // 返り値のはなし
      'data': params,
      'processData': false, // data:に指定したオブジェクトをGETメソッドのクエリ文字への変換有無を設定する項目. postならfalse
      'contentType': false // データ送信時のcontent-typeヘッダの値. FormDataオブジェクトの場合は適切なcontentTypeが設定されるので不要
    })
  }

  static getRailsToken () {
    return $('meta[name="csrf-token"]')[0].content
  }

  static modifyPath (path) {
    return (path[0] === '/') ? path.slice(1) : path
  }

}

module.exports = API
