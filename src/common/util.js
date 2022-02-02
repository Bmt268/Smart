// 获取随机数
export const getRandomInit = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
// 洗牌函数
export const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let k = getRandomInit(0, i);
        let t = arr[i];
        arr[i] = arr[k];
        arr[k] = t;
    }
    return arr;
};