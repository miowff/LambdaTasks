import AWS from "aws-sdk";


class S3Service {
  private s3 = new AWS.S3({ region: process.env.REGION });
  public async createPresignedPost(
    userEmail: string,
    imageName: string,
    contentType: string
  ) {
    const params = {
      Bucket: "uploaded-users-images-bucket",
      Conditions: [["content-length-range", 0, 10000000]],
      Fields: {
        Key: `${userEmail}/${imageName}`,
        ContentType: contentType,
      },
      Expires: 3000,
    };
    return this.s3.createPresignedPost(params);
  }
  public async deleteImage(imageKey: string) {
    await this.s3
      .deleteObject({
        Bucket: "uploaded-users-images-bucket",
        Key: imageKey,
      })
      .promise();
  }
  public async createAccessUrl(imageKey: string): Promise<string> {
    const url = await this.s3.getSignedUrl("getObject", {
      Bucket: "uploaded-users-images-bucket",
      Key: imageKey,
      Expires: 3000,
    });
    return url;
  }
}

const s3Service = new S3Service();
export default s3Service;
