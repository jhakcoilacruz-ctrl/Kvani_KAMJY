import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const products = getFeaturedProducts();

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="relative w-full h-[819px] min-h-[600px] flex items-end">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH44KlIGWvx1Zd5s4p_Uwhr2Uyhmiiw3T1ok9QChDr-nGaL4cdq5T3EkbaYScW9EdYFwjioL4FAETAL9PWdc1-OBFVXqFuafFzqC7CK_L9UxDRzcfbgVBsNSwZNjWeRBCed8pAzUhOoSPgR9VYRnGiDROOWAo0oJdtfZZq-JrFl-U0wyBYjkMhN2XLKc7lUsr6vqyBxGVCQIM90jZLXZfkelR3iFrcoO-gc64_ljf22xRfiS9-dQ"
              alt="KVANI Hero"
              className="w-full h-full object-cover object-center grayscale opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          <div className="relative z-10 w-full px-margin-mobile md:px-margin-desktop pb-xl max-w-7xl mx-auto">
            <p className="font-label-caps text-label-caps text-primary-fixed mb-xs tracking-[0.2em] uppercase">
              Nueva Colección Drop 2024
            </p>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl text-tertiary font-black max-w-4xl leading-none mb-md uppercase tracking-tighter">
              ESTILO QUE DEFINE TU CIUDAD
            </h1>
            <a
              href="/coleccion"
              className="inline-block bg-primary-fixed text-on-primary-fixed font-label-caps text-label-caps px-md py-sm uppercase tracking-widest hover:bg-white transition-colors duration-300"
            >
              VER COLECCIÓN NUEVA
            </a>
          </div>
        </section>

        {/* Bestsellers */}
        <section className="py-xl px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-lg border-b border-white/20 pb-sm">
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-tertiary font-black uppercase tracking-tighter">
              Los Favoritos Del Barrio
            </h2>
            <a href="/coleccion" className="font-label-caps text-label-caps text-primary-fixed hover:text-white transition-colors">
              VER TODOS +
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-gutter">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Categorías */}
        <section className="py-xl px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto">
          <h2 className="font-headline-md text-headline-md text-tertiary font-bold uppercase tracking-tighter mb-lg border-b border-white/20 pb-sm">
            Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter h-auto md:h-[600px]">
            {[
              { name: "Polos", big: true },
              { name: "Hoodies" },
              { name: "Accesorios" },
            ].map((cat) => (
              <a
                key={cat.name}
                href={`/coleccion?categoria=${cat.name.toLowerCase()}`}
                className={`group relative overflow-hidden border border-white/20 block h-[250px] md:h-auto ${
                  cat.big ? "lg:col-span-2 md:row-span-2 h-[300px] md:h-full" : ""
                }`}
              >
                <div className="absolute inset-0 bg-surface-container-highest" />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-md left-md">
                  <h3
                    className={`font-headline-lg-mobile text-tertiary font-black uppercase tracking-tighter ${
                      cat.big ? "md:font-headline-lg md:text-headline-lg" : "md:font-headline-md md:text-headline-md"
                    }`}
                  >
                    {cat.name}
                  </h3>
                  {cat.big && (
                    <span className="font-label-caps text-label-caps text-primary-fixed mt-xs block">
                      EXPLORAR +
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Por qué KVANI */}
        <section id="nosotros" className="py-xl bg-surface-container-lowest border-y border-white/10">
          <div className="w-full max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl md:gap-gutter text-center">
              {[
                { icon: "local_shipping", title: "Envíos a todo el Perú", text: "Llegamos a cada rincón de la ciudad, rápido y seguro." },
                { icon: "diamond", title: "Prendas Únicas", text: "Drops limitados. Diseño brutalista, calidad premium." },
                { icon: "verified_user", title: "Pagos Seguros", text: "Coordina tu pago directamente por WhatsApp con confianza." },
              ].map((f) => (
                <div key={f.title} className="flex flex-col items-center">
                  <span className="material-symbols-outlined text-[48px] text-primary-fixed mb-md">{f.icon}</span>
                  <h4 className="font-headline-md text-[20px] text-tertiary font-bold uppercase mb-xs tracking-tight">
                    {f.title}
                  </h4>
                  <p className="font-body-md text-body-md text-secondary">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
