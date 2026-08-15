const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.heroSlide.deleteMany()
  await prisma.product.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.category.deleteMany()

  console.log('Seeding Hero Slides...')
  await prisma.heroSlide.createMany({
    data: [
      {
        title1: "Calidad &",
        title2: "Diseño",
        titleHighlight: "excepcional",
        subtitle: "excepcional en cada uno de nuestros productos",
        text1: "Descubre la elegancia en cada rincón.",
        text2: "VICAR'S: Redefiniendo el lujo en el hogar.",
        image: "/images/DSC02180-scaled.jpg",
      },
      {
        title1: "Espacios",
        title2: "que",
        titleHighlight: "inspiran",
        subtitle: "Mobiliario diseñado para tu bienestar",
        text1: "Transformamos casas en verdaderos hogares.",
        text2: "VICAR'S: Confort y estilo a tu alcance.",
        image: "/images/DSC02219-600x338.jpg",
      },
      {
        title1: "Confort en",
        title2: "cada",
        titleHighlight: "detalle",
        subtitle: "Artesanía y materiales de primera",
        text1: "El descanso que tú y tu familia merecen.",
        text2: "VICAR'S: Tu mejor inversión en comodidad.",
        image: "/images/DSC02540-600x338.jpg",
      },
    ]
  })

  console.log('Seeding Products...')
  await prisma.product.createMany({
    data: [
      { name: "Sala Premium", price: "$ 2,500.000", image: "/images/DSC02160-600x338.jpg" },
      { name: "Comedor Elegance", price: "$ 3,200.000", image: "/images/DSC02219-600x338.jpg" },
      { name: "Alcoba Minimalista", price: "$ 1,800.000", image: "/images/DSC02223-600x338.jpg" },
      { name: "Sala Confort", price: "$ 2,100.000", image: "/images/DSC02540-600x338.jpg" },
      { name: "Silla de Acento Velvet", price: "$ 850.000", image: "/images/DSC02160-600x338.jpg" },
      { name: "Sofá Modular Lujo", price: "$ 4,100.000", image: "/images/DSC02219-600x338.jpg" }
    ]
  })

  console.log('Seeding Experiences...')
  await prisma.experience.createMany({
    data: [
      { city: "Cali", title: "Sala de experiencia no.1", description: "Visítanos en nuestra sala principal.", image: "/images/DSC02160-600x338.jpg" },
      { city: "Palmira", title: "Sala de experencia no.5", description: "Conoce lo mejor de nuestro catálogo.", image: "/images/DSC02219-600x338.jpg" },
      { city: "Bogotá", title: "Sala de experiencia VIP", description: "Diseños exclusivos para clientes VIP.", image: "/images/DSC02223-600x338.jpg" },
      { city: "Medellín", title: "Sala de diseño moderno", description: "Inspiración en cada rincón.", image: "/images/DSC02540-600x338.jpg" }
    ]
  })

  console.log('Seeding Categories...')
  await prisma.category.createMany({
    data: [
      { name: "SALAS", slug: "salas", image: "/images/DSC02160-600x338.jpg" },
      { name: "COMEDORES", slug: "comedores", image: "/images/DSC02219-600x338.jpg" },
      { name: "ALCOBAS", slug: "alcobas", image: "/images/DSC02223-600x338.jpg" },
      { name: "DECORACIÓN", slug: "decoracion", image: "/images/DSC02540-600x338.jpg" },
    ]
  })

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
