import Request from "@/common/request";

// 主页

// 获取轮播图
export const getBannerList = (data) => Request.post("/api_banner/index", data);

// 首页素材导航
export const getNavigateMaterial = (data, headers) =>
  Request.post("/api_category/get_navigate_material", data, headers);

// 查询素材分类
export const getCategoryMaterial = (data, headers) =>
  Request.post("/api_category/get_category_material", data, headers);

// 推荐分类下的专题包
export const getMaterialSpecial = (data, headers) =>
  Request.post("/api_category/get_material_special", data, headers);

// 专题包内容
export const getSpecialContent = (data, headers) =>
  Request.post("/api_special/get_special_pack_detail", data, headers);

// 专题包素材列表
export const getSpecialImg = (data, headers) =>
  Request.post("/api_special/get_all_material", data, headers);

//添加收藏
export const newAddCellection = (data, headers) => {
  return Request.post("/maxwell/v1.0/favorites", data, headers);
};
//删除收藏
export const newDleCellection = (data, headers) => {
  return Request.get("/maxwell/v1.0/favorites", data, headers);
};
// 集体教学下的分类
export const getSeriesCategory = data =>
  Request.get("/maxwell/v1.0/material/lessonSeries/category", data);

// 搜索当前付费的系列活动
export const searchSerialsSome = data =>
  Request.post("/api_material/search_serials_some", data);

// 单个系列详情
export const getSerialsDetail = data =>
  Request.post("/api_material/detail_serial", data);

// 单个系列某个年级课程结构
export const getThemeSerial = data =>
  Request.post("/api_material/theme_serial", data);

//获取单个绘本详情
export const getPicBooksDetail = data =>
  Request.post("/api_book/get_book_detail", data);

// 获取图片或者音频
export const getMaterialDetail = (data, headers) => {
  return Request.get("/maxwell/v1.0/material/materialDetail", data, headers);
};

// 库内资源分享b端
export const getMaterialQRcode = (data, headers) => {
  return Request.get("/maxwell/v1.0/resource/qrcode", data, headers);
};

//获取用户所在班级
export const getClasses = data =>
  Request.get("/maxwell/v1.0/schedule/user/rooms", data);

// 获取个人信息
export const getUserInfo = data => Request.post("/api_user/info", data);

// 收藏

//收藏列表
export const newCellectionList = (data, headers) => {
  return Request.get("/maxwell/v1.0/favorites/list", data, headers);
};

//更换头像
export const changeHead = data => Request.post("/api_user/headimg", data);

//修改个人信息
export const updateName = data => Request.post("/api_user/update_info", data);

// 获取素材历史浏览
export const getRecentRecords = data =>
  Request.get("/maxwell/v1.0/material/getRecentRecords", data);

// 获取活动详情
export const getActivityDetail = data =>
  Request.post("/api_material/activity_detail", data);

//视频详情
export const getVideoDetail = (data, headers) => {
  return Request.get("/maxwell/v1.0/material/videoDetail", data, headers);
};

//游戏详情
export const getGameDetail = (data, headers) => {
  return Request.get("/maxwell/v1.0/material/gameDetail", data, headers);
};
// 删除素材历史浏览
export const deleteMaterialRecord = params =>
  Request.post(`/maxwell/v1.0/material/deleteRecordById?id=${params.id}`);

//全局搜索分类词
export const getGlobalTag = data =>
  Request.post("/api_category/get_global_tag", data);

// 搜索素材
export const searchMaterial = data =>
  Request.post("/maxwell/v1.0/search/keyword", data);

// 获取招生手册 编辑还是创建状态
export const getEnrollmentStatus = data =>
  Request.get("/maxwell/v1.0/school/enrollment/status", data);

//获取班级列表
export const getClassList = data => Request.post("/api_room/lst", data);

//删除班级
export const delClass = data => Request.post("/api_room/del", data);

