"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { writeFile } from "fs/promises"
import path from "path"

const prisma = new PrismaClient()

async function saveImage(imageFile: File | null) {
  if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uniqueName = `${Date.now()}-${imageFile.name.replace(/\s+/g, '_')}`
    const filePath = path.join(process.cwd(), "public", "images", uniqueName)

    await writeFile(filePath, buffer)
    return `/images/${uniqueName}`
  }
  return null
}

export async function updateProduct(formData: FormData) {
  const id = Number(formData.get("id"))
  const name = formData.get("name") as string
  const price = parseFloat(formData.get("price") as string) || 0;
  const categoryId = Number(formData.get("categoryId"))

  const updateData: any = {
    name,
    price,
    categoryId,
  }

  const mainImageFile = formData.get("image") as File | null
  const imageUrl = await saveImage(mainImageFile)
  if (imageUrl) {
    updateData.image = imageUrl
  }

  await prisma.product.update({
    where: { id },
    data: updateData
  })

  // Handle gallery images
  const galleryFiles = formData.getAll("galleryImages") as File[]
  for (const file of galleryFiles) {
    const galleryUrl = await saveImage(file)
    if (galleryUrl) {
      await prisma.productImage.create({
        data: {
          url: galleryUrl,
          productId: id
        }
      })
    }
  }

  revalidatePath("/admin/productos")
  revalidatePath("/")
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string
  const price = parseFloat(formData.get("price") as string) || 0;
  const categoryId = Number(formData.get("categoryId"))

  const mainImageFile = formData.get("image") as File | null
  const imageUrl = await saveImage(mainImageFile) || ""

  const newProduct = await prisma.product.create({
    data: {
      name,
      price,
      categoryId,
      image: imageUrl
    }
  })

  // Handle gallery images
  const galleryFiles = formData.getAll("galleryImages") as File[]
  for (const file of galleryFiles) {
    const galleryUrl = await saveImage(file)
    if (galleryUrl) {
      await prisma.productImage.create({
        data: {
          url: galleryUrl,
          productId: newProduct.id
        }
      })
    }
  }

  revalidatePath("/admin/productos")
  revalidatePath("/")
}

export async function deleteProductImage(imageId: number) {
  await prisma.productImage.delete({
    where: { id: imageId }
  })
  
  revalidatePath("/admin/productos")
  revalidatePath("/")
}
