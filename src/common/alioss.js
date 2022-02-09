import { getOSStoken } from "@/api/home.js"

const OSS = require('ali-oss')

const uploadSource = (course) => {
    return new Promise((resolve, reject) => {
        getOSStoken().then((res) => {
            let { accessKeyId, accessKeySecret, expiration, securityToken } = res.data
            console.log(accessKeyId, accessKeySecret, expiration, securityToken);
            let client = new OSS({
                region: "oss-cn-beijing",
                accessKeyId,
                accessKeySecret,
                stsToken: securityToken,
                bucket: "zino-common",
                secure: true
            })
            let folder = "resource/prod/";//文件名
            let index = 0;//文件索引
            let result = []
            function uploadOss() {
                client.multipartUpload(`${folder}${course[index].name}`, course[index], {
                    partSize: 1024 * 400,//分片大小
                    timeout: 12000,//超时
                    progress: function (value) {
                        console.log(value);
                    } //进度条
                }).then((res) => {
                    if (res.res.status == 200) {
                        index++
                        result.push(res)
                        if (index < course.length) {
                            uploadOss()
                        }
                        if (index === course.length) {
                            resolve(result)
                        } else {
                            reject()
                        }

                    }
                })
            }
            uploadOss()
        })
    })
}

export default uploadSource;