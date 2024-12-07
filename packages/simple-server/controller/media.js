
import multer from "multer"
import MAO from "multer-aliyun-oss"

import { response } from "../utils/response.js";

export class MediaController {
  upload() {
    const handler = async (req, res) => {
      const upload = multer({
        storage: MAO({
          config: {
            region: 'oss-cn-shenzhen',
            accessKeyId: 'xxx',
            accessKeySecret: 'xxx',
            bucket: 'simple-code-oss',
          }
        })
      });
      const singleFileUpload = upload.single('file');
      singleFileUpload(req, res, function (err) {
        // 如果没有上传图片 需要报错
        if(!req.file) {
          res.json(response.validateFailed())
          return
        }
        if (err) {
          res.json(response.fail(err))
        }
        else {
          res.json(response.success(req.file.url))
        }
      });
    }
    return [ handler]
  }
}