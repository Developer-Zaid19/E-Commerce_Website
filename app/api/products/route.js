import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "products.json"
);

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

export async function POST(request) {
  try {
    const newProduct = await request.json();

    const file = await fs.readFile(
      filePath,
      "utf-8"
    );

    const products = JSON.parse(file);

    // Duplicate ID check
    const exists = products.find(
      (product) => product.id === newProduct.id
    );

    if (exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Product ID already exists",
        },
        { status: 400 }
      );
    }

    const productToSave = {
      ...newProduct,
      embedding: newProduct.embedding || [],
    };

    products.push(productToSave);

    await fs.writeFile(
      filePath,
      JSON.stringify(products, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      {
        success: true,
        product: productToSave,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create product",
      },
      { status: 500 }
    );
  }
}