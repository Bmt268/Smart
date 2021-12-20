import Request from "@/common/request";

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