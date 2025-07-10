"use server"

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export async function sendMessage({
    QueueUrl,
    MessageBody,
    DelaySeconds=0,
    MessageGroupId,
}:{
    QueueUrl: string;
    MessageBody: string;
    DelaySeconds?: number;
    MessageGroupId?: string;
}){
    const command = new SendMessageCommand({
        QueueUrl,
        MessageBody,
        DelaySeconds,
        ...(MessageGroupId ? { MessageGroupId } : {})
    });

    try {
        const response = await sqs.send(command);
        return response;
    } catch (error) {
        console.error("failed to send SQS message:", error);
        throw error;
    }
}
