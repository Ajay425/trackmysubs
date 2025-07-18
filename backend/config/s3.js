const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'track-my-subs',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      const filename = `profile-${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
});
module.exports = { upload, s3 };
