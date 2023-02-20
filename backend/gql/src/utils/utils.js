import dotenv from "dotenv";
import QRCode from "qrcode";

dotenv.config();

export function generateRandomString(length) {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}

export function generateSlug(title) {
    const slug =
        title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "") +
        "-" +
        generateRandomString(6);
    return slug;
}

export async function generateQR(type, id) {
    const qr = await QRCode.toDataURL(
        `This is a test ${type} QR code for ${id}`
    );
    return qr;
}
