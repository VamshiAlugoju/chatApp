const aws = require("aws-sdk");

const upload_to_s3 =(filename,body)=>{

    const s3bucket = new aws.S3({
        accessKeyId:"AKIAXFJXVS47U3VGDGOI",
        secretAccessKey:"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"
    });

    const params = {
       Bucket:"chatappbucket224",
       Key:filename,
       Body:body,
       ACL:"public-read"
    }
   return new Promise((resolve,reject)=>{

       s3bucket.upload(params,(err,s3response)=>{
           if(err)
           {
               reject(err)
           }
           resolve(s3response)
       })
   })
}

module.exports = upload_to_s3;