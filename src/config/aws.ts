import aws from 'aws-sdk';
import {PromiseResult} from 'aws-sdk/lib/request';

const SES_ACCESS_KEY_ID = process.env.SES_ACCESS_KEY_ID;
const SES_SECRET_ACCESS_KEY = process.env.SES_SECRET_ACCESS_KEY;
const SES_REGION = process.env.SES_REGION;
const SES_EMAIL = process.env.SES_EMAIL;

if (!SES_ACCESS_KEY_ID || !SES_SECRET_ACCESS_KEY || !SES_REGION || !SES_EMAIL) {
  throw new Error('Missing SES environment variables');
}

const SES_CONFIG = {
  accessKeyId: SES_ACCESS_KEY_ID,
  secretAccessKey: SES_SECRET_ACCESS_KEY,
  region: SES_REGION,
};

const AWS_SES = new aws.SES(SES_CONFIG);

export async function sendEmail(
  recipientEmail: string,
  subject: string,
  body: string,
): Promise<PromiseResult<aws.SES.SendEmailResponse, aws.AWSError>> {
  const params: aws.SES.Types.SendEmailRequest = {
    Source: SES_EMAIL!,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: body,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
  };

  return await AWS_SES.sendEmail(params).promise();
}
