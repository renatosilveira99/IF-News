import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import AmazonS3URI from 'amazon-s3-uri';
import mime from 'mime';
import uploadConfig from '../../../../config/upload';
import { IStorageProvider } from '../entities/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_DEFAULT_REGION,
    })
  }

  async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client.putObject({
      Bucket: process.env.BUCKET_NAME,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    }).promise();

    await fs.promises.unlink(originalPath);

    const imageUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${file}`;

    return imageUrl;
  }

  async deleteFile(file: string): Promise<void> {
    const { key } = AmazonS3URI(file)

    await this.client.deleteObject({
      Bucket: process.env.BUCKET_NAME,
      Key: key,
    }).promise();
  }
}

export { S3StorageProvider }