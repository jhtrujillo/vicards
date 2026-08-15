export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Hero Slider</h3>
          <p className="text-gray-500 mb-4">Administra las imágenes principales y textos que ven los usuarios al entrar.</p>
          <a href="/admin/hero" className="text-[#70970A] font-medium hover:underline">Editar Hero &rarr;</a>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Productos Destacados</h3>
          <p className="text-gray-500 mb-4">Gestiona los productos que aparecen en el carrusel de la página de inicio.</p>
          <a href="/admin/productos" className="text-[#70970A] font-medium hover:underline">Editar Productos &rarr;</a>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Salas de Experiencia</h3>
          <p className="text-gray-500 mb-4">Edita la información de las sedes y salas de experiencia física.</p>
          <a href="/admin/salas" className="text-[#70970A] font-medium hover:underline">Editar Salas &rarr;</a>
        </div>
      </div>
    </div>
  );
}
