import { getOSStoken } from "@/api/home.js"

const OSS = require('ali-oss')

const uploadSource = () => {
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
        client.multipartUpload()
    })
}

export default uploadSource;