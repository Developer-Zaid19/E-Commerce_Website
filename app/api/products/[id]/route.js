import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "data",
  "products.json"
);

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updatedProduct = await request.json();

    const file = await fs.readFile(
      filePath,
      "utf-8"
    );

    const products = JSON.parse(file);

    const index = products.findIndex(
      (product) => product.id === id
    );

    if (index === -1) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    products[index] = {
      ...products[index],
      ...updatedProduct,
    };

    await fs.writeFile(
      filePath,
      JSON.stringify(products, null, 2),
      "utf-8"
    );

    return NextResponse.json({
      success: true,
      product: products[index],
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const file = await fs.readFile(
      filePath,
      "utf-8"
    );

    const products = JSON.parse(file);

    const filteredProducts = products.filter(
      (product) => product.id !== id
    );

    await fs.writeFile(
      filePath,
      JSON.stringify(filteredProducts, null, 2),
      "utf-8"
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}