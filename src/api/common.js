import Request from "@/common/request";

// 登录
export const getLoginInfo = (data) => Request.post("/api_user/login", data);

//获取验证码
export const getSms = (data) => Request.post("/api_user/sms", data);

// 获取个人信息
export const getUserInfo = (data) => Request.post("/api_user/info", data);
