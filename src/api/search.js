import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
import axios from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 963513011,
    uin: 872286926,
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
    _: 1544595249274
  })

  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {
  let url = 'api/search'

  const data = Object.assign({}, commonParams, {
    g_tk: 963513011,
    uin: 872286926,
    platform: 'h5',
    needNewCode: 1,
    w: query,
    zhidaqu: 1,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
    _: 1544598999719
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
