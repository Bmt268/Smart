/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * credential: 跨域;
 *
 */

const development = {
  baseUrl: "//clitest.eduxdesign.com",
  // baseUrl: "//backrelease.ku-61.com/",
  websiteDome: "ku_test.eduxdesign.com",
  credential: false,
  setSiteId: 2,
  appid: "wx4d6607ed56e3dcc9",
  showSelfTeachPlan: true
};

const release = {
  // 预发
  ...development,
  baseUrl: "//backrelease.ku-61.com/",
  websiteDome: "ku-61.com",
  setSiteId: 8,
  appid: "wx6d516cd68858270b",
  showSelfTeachPlan: true
};

const prod = {
  // 上线
  ...release,
  baseUrl: "//back.ku-61.com/",
  appid: "wx1e8119a0dff42a7b",
  showSelfTeachPlan: false
};

const configMap = {
  development,
  release,
  prod
};

export default configMap[process.env.NODE_ENV];
