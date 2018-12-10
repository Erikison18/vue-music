import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'
// import axios from 'axios'

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 2086837079,
    uin: 872286926,
    platform: 'h5',
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

export function getMusicList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    g_tk: 1655680922,
    uin: 872286926,
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid,
    _: 1544452159364
  })

  return jsonp(url, data, options)
}