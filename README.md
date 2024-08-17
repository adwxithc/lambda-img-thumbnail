

# Lambda Image Thumbnail Generator

## Overview

This project features an AWS Lambda function that triggers when an image is uploaded to an S3 bucket. It generates a thumbnail of the image and uploads it to a different S3 bucket.

## Features

- **Automatic Trigger**: Lambda function automatically triggers on image upload to the source S3 bucket.
- **Thumbnail Creation**: Uses Node.js to create a resized thumbnail of the uploaded image.
- **S3 Storage**: Stores the generated thumbnail in a specified destination S3 bucket.

## Architecture

1. **Source S3 Bucket**: Bucket where the original images are uploaded.
2. **Lambda Function**: Processes images to generate thumbnails.
3. **Destination S3 Bucket**: Bucket where thumbnails are stored.

## Setup

### Prerequisites

- AWS CLI installed and configured
- Node.js (version 16 or later)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adwxithc/lambda-img-thumbnail.git
   cd lambda-img-thumbnail
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Set up the following environment variable in your Lambda function:
   - `DEST_BUCKET`: The name of the S3 bucket where thumbnails will be stored.

### Deployment

1. **Package your Lambda function:**

   - **On macOS or Linux:**

     ```bash
     zip -r function.zip .
     ```

   - **On Windows:**

     ```powershell
     powershell -Command "Compress-Archive -Path .\* -DestinationPath function.zip"
     ```

2. **Upload the zip file to S3 (for Lambda deployment):**

   ```bash
   aws s3 cp function.zip s3://your-bucket-name/function.zip
   ```

3. **Update your Lambda function with the S3 object:**

   ```bash
   aws lambda update-function-code --function-name your-lambda-function-name --s3-bucket your-bucket-name --s3-key function.zip --region your-region --publish
   ```

### Local Development

You can use tools like [AWS SAM](https://aws.amazon.com/serverless/sam/) or [LocalStack](https://localstack.cloud/) for local development and testing.

### Testing

1. **Upload an image to the source S3 bucket.**
2. **Verify that the Lambda function triggers and that a thumbnail is created and stored in the destination S3 bucket.**


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.


## Contact

For questions or feedback, please contact:

- **Adwaith C**
- **Email**: [adwaithjanardhanan0@gmail.com](mailto:adwaithjanardhanan0@gmail.com)
- **LinkedIn**: [Adwaith C LinkedIn](https://www.linkedin.com/in/adwaith-c-25b5a0218/)
- **GitHub**: [adwxithc](https://github.com/adwxithc)

