import {
    S3Client,
    GetObjectCommand,
    PutObjectCommand,
} from "@aws-sdk/client-s3";
import Jimp from "jimp";

const S3 = new S3Client();
const DEST_BUCKET = process.env.DEST_BUCKET;
const THUMBNAIL_WIDTH = 200; // px
const SUPPORTED_FORMATS = {
    jpg: true,
    jpeg: true,
    png: true,
};

export const handler = async (event, context) => {
    console.log('got event', event);

    const { eventTime, s3 } = event.Records[0];
    const srcBucket = s3.bucket.name;

    // Object key may have spaces or unicode non-ASCII characters
    const srcKey = decodeURIComponent(s3.object.key.replace(/\+/g, " "));
    const ext = srcKey.replace(/^.*\./, "").toLowerCase();

    console.log(`${eventTime} - ${srcBucket}/${srcKey}`);

    if (!SUPPORTED_FORMATS[ext]) {
        console.log(`ERROR: Unsupported file type (${ext})`);
        return;
    }

    // Get the image from the source bucket
    try {
        const { Body, ContentType } = await S3.send(
            new GetObjectCommand({
                Bucket: srcBucket,
                Key: srcKey,
            })
        );

        // Convert the image stream to a buffer
        const chunks = [];
        for await (const chunk of Body) {
            chunks.push(chunk);
        }
        const imageBuffer = Buffer.concat(chunks);

        // Resize image using Jimp
        const image = await Jimp.read(imageBuffer);
        const outputBuffer = await image.resize(THUMBNAIL_WIDTH, Jimp.AUTO).getBufferAsync(Jimp.MIME_PNG);

        // Store new image in the destination bucket
        await S3.send(
            new PutObjectCommand({
                Bucket: DEST_BUCKET,
                Key: srcKey,
                Body: outputBuffer,
                ContentType,
            })
        );

        const message = `Successfully resized ${srcBucket}/${srcKey} and uploaded to ${DEST_BUCKET}/${srcKey}`;
        console.log(message);
        return {
            statusCode: 200,
            body: message,
        };
    } catch (error) {
        console.log('catched error', error);
        return {
            statusCode: 500,
            body: `Failed to process ${srcBucket}/${srcKey}: ${error.message}`,
        };
    }
};
