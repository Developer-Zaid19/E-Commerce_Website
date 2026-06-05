import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file uploaded",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "public",
      "ProductsMedia",
      "img"
    );

    await fs.mkdir(uploadDir, {
      recursive: true,
    });

    const extension =
      path.extname(file.name) || ".webp";

    const fileName = `${Date.now()}${extension}`;

    const filePath = path.join(
      uploadDir,
      fileName
    );

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileName,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 }
    );
  }
}