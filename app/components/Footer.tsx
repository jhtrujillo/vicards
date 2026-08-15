import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Green Call-to-action Section */}
      <div className="bg-[#70970A] py-8 text-center px-4">
        <h2 className="text-white font-display font-bold text-2xl mb-2">
          ¿Dónde comprar?
        </h2>
        <p className="text-white text-sm md:text-base mb-2 font-medium max-w-2xl mx-auto leading-relaxed">
          Calidad & Diseño excepcional excepcional en cada uno de nuestros productos<br /><br />
          Descubre la elegancia en cada rincón.<br />
          VICAR'S: Redefiniendo el lujo en el hogar.
        </p>
        <div className="mt-4">
          <Link 
            href="/tienda" 
            className="inline-flex items-center justify-center bg-white text-primary font-bold py-3 px-8 text-sm hover:bg-gray-50 transition-colors shadow-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            Ir a la tienda
          </Link>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-[#fdfdf7] py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
            
            {/* 1. Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="inline-block">
                <img 
                  src="/logo.png" 
                  alt="Vicars Muebles Logo" 
                  className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
            </div>

            {/* 2. Legal Links */}
            <div className="flex flex-col space-y-2">
              <Link href="/terminos" className="text-gray-500 hover:text-primary text-sm transition-colors font-medium">
                Términos y condiciones
              </Link>
              <Link href="/privacidad" className="text-gray-500 hover:text-primary text-sm transition-colors font-medium">
                Políticas de privacidad
              </Link>
            </div>

            {/* 3. Contact Info */}
            <div className="flex flex-col space-y-1 text-gray-600 text-sm font-medium">
              <a href="tel:3160180007" className="hover:text-primary transition-colors">316 0180007</a>
              <a href="mailto:servicioalcliente@vicars.com" className="hover:text-primary transition-colors">servicioalcliente@vicars.com</a>
              <span>Calle 44 No. 4E -13. Cali, Valle.</span>
            </div>

            {/* 4. Social Links */}
            <div className="flex flex-col space-y-3">
              <span className="text-gray-900 font-bold text-sm">Síguenos</span>
              <div className="flex space-x-3">
                {/* WhatsApp */}
                <a href="#" className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="sr-only">WhatsApp</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.125-.397-.179-.974-.396-1.996-1.428-1.008-1.02-1.226-1.745-1.266-1.921-.04-.176-.017-.384.116-.547.114-.14.24-.265.341-.39.103-.125.137-.215.205-.357.069-.143.034-.267-.017-.37-.052-.102-.457-1.102-.626-1.509-.166-.395-.333-.342-.457-.348-.12-.005-.258-.005-.395-.005-.138 0-.361.052-.55.258-.189.206-.723.707-.723 1.724 0 1.018.74 2.001.843 2.14.103.138 1.432 2.247 3.535 3.09.5.201.89.32 1.196.41.504.148.963.127 1.326.077.41-.056 1.258-.514 1.436-1.011.177-.497.177-.923.124-1.011-.052-.089-.189-.142-.395-.246z"/></svg>
                </a>
                {/* Facebook */}
                <a href="#" className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-8 h-8 rounded-full border-2 border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
