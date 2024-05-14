export const stringToBlob = (dataURI: string): Blob => {
    const base64String = dataURI.split(',')[1];
    const binaryString = atob(base64String);
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array], { type: 'image/jpeg' });

    return blob;
};

export const blobToArrayBuffer = (blob: Blob): Promise<ArrayBuffer> => {
    return blob.arrayBuffer();
}
