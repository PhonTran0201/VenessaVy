export class Helpers {
    public static encode(data: string): string {
        const buffer = Buffer.from(data);
        return buffer.toString('base64');
    }
    
    public static decode(data: string): string {
        const buffer = Buffer.from(data, 'base64');
        return buffer.toString('ascii');
    }
}