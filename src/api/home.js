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

// 单素材排课环节获取
export const getmaterialcheduling = (data, headers) =>
  Request.get(
    "/maxwell/v1.0/schedule/v4/process",
    data,
    headers
  );

// 获取环节信息列表
export const getProcess = (data, headers) =>
  Request.get(
    "/maxwell/v1.0/takeclass/process",
    data,
    headers
  );

// 获取环节下的排课信息
export const getProcessClass = (data, headers) =>
  Request.get(
    "/maxwell/v1.0/takeclass/process/lesson",
    data,
    headers
  );

// 课表内排课 库内资源/园所资源新接口 区分是否有目标的填写
export const setMaterialsDefaultTarget = (data, headers) =>
  Request.post(
    "/maxwell/v1.0/schedule/garden/defination/defaultTarget",
    data,
    headers
  );

// 管理


// 获取招生手册 编辑还是创建状态
export const getEnrollmentStatus = data =>
  Request.get("/maxwell/v1.0/school/enrollment/status", data);

//获取班级列表
export const getClassList = data => Request.post("/api_room/lst", data);

//删除班级
export const delClass = data => Request.post("/api_room/del", data);

//编辑班级
export const editClass = data => Request.put("/maxwell/v1.0/room", data);

//添加班级
export const addClass = data => Request.post("/maxwell/v1.0/room", data);

//获取我的班级列表
export const getMyClassList = data =>
  Request.get("/maxwell/v1.0/schedule/user/rooms", data);

//查询学生信息
export const getStudent = data => Request.post("api_student/lst", data);

//离园
export const quitStudent = data => Request.post("api_student/quit", data);

//获取班级邀请学生二维码
export const getInvitStuQR = (data, headers) => {
  return Request.get("/maxwell/v1.0/room/invite/code", data, headers);
};

//获取教师列表
export const getTeacherList = data => Request.post("/api_user/lst_share", data);

//编辑老师
export const editTeacher = data => Request.post("/api_user/set_share", data);

//删除老师
export const delTeacher = data => Request.post("/api_user/del_share", data);

//园长首页
export const getSaasCount = data =>
  Request.post("/api_room/get_saas_count", data);

// 查询课堂笔记
export const getClassRoomRecords = (data) =>
  Request.get("/maxwell/v1.0/inspire/v3/classnotes", data);
// 删除课堂笔记
export const deleteRecordApi = (data) =>
  Request.put("/maxwell/v1.0/inspire/v3/blackboard", data);

// 基本设置
export const getSelf = data => Request.post("/api_saas/self", data);

// 基本设置保存
export const setCfg = data => Request.post("/api_saas/cfg", data);



// AI课表

// 按照日期查课表
export const getScheduleList = data =>
  Request.get("/maxwell/v1.0/schedule/new", data);

//课表获取年月周接口
export const getWeekOfMonth = (data, headers) => {
  return Request.get("/maxwell/v1.0/schedule/weekOfMonth", data, headers);
};


// 园所资源

export const getCateGoryRoot = (data) => Request.get("/maxwell/v1.0/course/category/root", data);

// 资源详情
export const getCateGoryChildren = (data) => Request.get("/maxwell/v1.0/course/category/children", data);

// 素材详情
export const getCateGoryCourseware = (data) => Request.get("/maxwell/v1.0/courseware", data);

// 新建主题
export const setCourseCategory = (data) => Request.post("/maxwell/v1.0/course/category", data);

// 手机查看 参数id(素材id)
export const getCourseQrcide = (data) => Request.post("/maxwell/v1.0/courseware/qrcode", data);

// 删除素材（参数素材id）
export const deleteCourseware = (data) => Request.delete(`/maxwell/v1.0/courseware/${data}`);

// 获取文件树
export const getCateGoryTree = (data) => Request.get(`/maxwell/v1.0/course/category/tree`, data);

// 复制素材
export const copyCourseware = (data) => Request.post(`/maxwell/v1.0/courseware/copy`, data);

// 获取oss Token
export const getOSStoken = (data, headers) =>
  Request.get("/maxwell/v1.0/oss/token", data, headers);

// 批量上传
export const batchUploadSource = (data, headers) =>
  Request.post("/maxwell/v1.0/courseware/batch", data, headers);

// 重命名
export const setCoursewareRename = (data, headers) =>
  Request.post("/maxwell/v1.0/courseware/rename", data, headers);