const AWS = require("aws-sdk")
const fs = require("fs")

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

const uploadFile = async (fileKey, filePath, buffer = null) => {
  let fileContent
  if (buffer) {
    fileContent = buffer
  } else {
    fileContent = fs.readFileSync(filePath)
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileKey}`,
    Body: fileContent
  }

  let response = await s3.upload(params).promise()
  return {
    url: response.Location,
    ETag: response.ETag,
    Key: response.Key
  }
}

const downloadFile = (fileKey, res) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileKey}`,
  }

  let fileStream = s3.getObject(params).createReadStream()
  fileStream.pipe(res)
}

const deleteFile = async (fileKey) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileKey}`,
  }

  // check if file exists
  if (await s3.headObject(params).promise()) {
    // delete the document
    await s3.deleteObject(params).promise()
  }
}

module.exports = {
  uploadFile,
  downloadFile,
  deleteFile,
}