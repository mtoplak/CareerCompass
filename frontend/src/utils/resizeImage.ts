import sharp from "sharp";
import { blobToArrayBuffer } from "./convertImage";

export const resizeImage = async (image: any, maxWidth: number): Promise<Blob> => {
    const arrayBuffer = await blobToArrayBuffer(image);
    const resizedBuffer = await sharp(arrayBuffer)
        .resize({ width: maxWidth })
        .toBuffer();

    return new Blob([resizedBuffer], { type: 'image/jpeg' });
}

export const resizeImageToDataUrl = async (image: any, maxWidth: number): Promise<string> => {
    const arrayBuffer = await blobToArrayBuffer(image);
    const resizedBuffer = await sharp(arrayBuffer)
        .resize({ width: maxWidth })
        .webp()
        .toBuffer();

    return `data:image/webp;base64,${resizedBuffer.toString('base64')}`;
}
