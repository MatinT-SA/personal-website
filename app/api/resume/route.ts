import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

function streamFile(filePath: string): ReadableStream<Uint8Array> {
    const fileStream = fs.createReadStream(filePath);

    return new ReadableStream<Uint8Array>({
        start(controller) {
            fileStream.on("data", (chunk: string | Buffer) => {
                controller.enqueue(
                    typeof chunk === "string"
                        ? new TextEncoder().encode(chunk)
                        : new Uint8Array(chunk),
                );
            });
            fileStream.on("end", () => {
                controller.close();
            });
            fileStream.on("error", (error) => {
                controller.error(error);
            });
        },
        cancel() {
            fileStream.destroy();
        },
    });
}

export async function GET(request: Request): Promise<NextResponse> {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale");

    if (!locale || (locale !== "en" && locale !== "fa")) {
        return new NextResponse("Invalid locale parameter.", { status: 400 });
    }

    const rootDir = process.cwd();
    const fileName = `Matin_Taherzadeh_${locale}.pdf`;
    const filePath = path.join(rootDir, "lib", "resume", fileName);

    if (!fs.existsSync(filePath)) {
        console.error(`File not found at: ${filePath}`);
        return new NextResponse(`Resume file for locale ${locale} not found.`, {
            status: 404,
        });
    }

    const localeDisplayName = locale.toUpperCase();
    const customDownloadName = `Matin Taherzadeh Resume - ${localeDisplayName}.pdf`;

    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
        "Content-Disposition",
        `attachment; filename="${customDownloadName}"`,
    );

    const fileStream = streamFile(filePath);

    return new NextResponse(fileStream, { headers });
}
