import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import * as _ from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TattooImagesService {
  private s3: S3Client;
  private bucket: string;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucket = this.configService.get('AWS_BUCKET_NAME');
  }

  async getImagesFromS3(prefix: string): Promise<string[]> {
    let isTruncated = true;
    let images: string[] = [];
    let continuationToken = undefined;

    while (isTruncated) {
      const params = {
        Bucket: this.bucket,
        Prefix: prefix,
        MaxKeys: 1000,
        ContinuationToken: continuationToken,
      };

      const command = new ListObjectsV2Command(params);
      const data = await this.s3.send(command);

      if (data.Contents) {
        const newImages = data.Contents.filter(
          (item) => !item.Key.endsWith('/'),
        ).map((item) => `https://${this.bucket}.s3.amazonaws.com/${item.Key}`);

        images = images.concat(newImages);
      }

      isTruncated = data.IsTruncated;
      continuationToken = data.NextContinuationToken;
    }

    return images;
  }

  async getAllImages() {
    const japanImages = await this.prisma.tattooImage.findMany({
      where: { style: 'japan' },
      orderBy: { pageNumber: 'asc' },
    });

    const realismImages = await this.prisma.tattooImage.findMany({
      where: { style: 'realism' },
      orderBy: { pageNumber: 'asc' },
    });

    const graphicsImages = await this.prisma.tattooImage.findMany({
      where: { style: 'graphics' },
      orderBy: { pageNumber: 'asc' },
    });

    return {
      japanImages,
      realismImages,
      graphicsImages,
    };
  }

  async seedImages() {
    const realismImages = await this.getImagesFromS3('realism/');
    const japanImages = await this.getImagesFromS3('japan/');
    const graphicsImages = await this.getImagesFromS3('graphics/');

    const imagesPerPage = 18;
    const maxPages = 3;

    const imageData = [];

    const mapImagesToPages = (images: string[], style: string) => {
      for (let page = 1; page <= maxPages; page++) {
        const startIdx = (page - 1) * 6;
        const endIdx = page * 6;

        const pageImages = images.slice(startIdx, endIdx);

        if (pageImages.length > 0) {
          pageImages.forEach((url, index) => {
            imageData.push({
              style,
              imageUrl: url,
              pageNumber: page,
            });
          });
        }
      }
    };

    mapImagesToPages(realismImages, 'realism');
    mapImagesToPages(japanImages, 'japan');
    mapImagesToPages(graphicsImages, 'graphics');

    const imageDataChunks = _.chunk(imageData, 100);
    for (const chunk of imageDataChunks) {
      await this.prisma.tattooImage.createMany({
        data: chunk,
        skipDuplicates: true,
      });
    }

    return 'Images inserted successfully';
  }

  async clearImages() {
    await this.prisma.tattooImage.deleteMany({});
    return 'All images have been deleted successfully';
  }
}
