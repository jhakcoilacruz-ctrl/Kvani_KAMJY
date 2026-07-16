import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { getAllProducts, getCategories } from "@/lib/products";

export const metadata = { title: "Colección — KVANI" };

export default function ColeccionPage({ searchParams }) {
  const categoria = searchParams?.categoria;
  const all = getAllProducts();
  const categories = getCategories();
  const products = categoria ? all.filter((p) => p.category === categoria) : all;

  return (
    <>
      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-32 px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto pb-xl">
        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-tertiary font-black uppercase tracking-tighter mb-md">
          Colección
        </h1>

        <div className="flex flex-wrap gap-sm mb-lg font-label-caps text-label-caps uppercase">
          <a
            href="/coleccion"
            className={`px-sm py-xs border ${!categoria ? "border-primary-fixed text-primary-fixed" : "border-white/20 text-secondary"}`}
          >
            Todo
          </a>
          {categories.map((c) => (
            <a
              key={c}
              href={`/coleccion?categoria=${c}`}
              className={`px-sm py-xs border ${categoria === c ? "border-primary-fixed text-primary-fixed" : "border-white/20 text-secondary"}`}
            >
              {c}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-gutter">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-secondary text-body-md">No hay productos en esta categoría todavía.</p>
        )}
      </main>
      <Footer />
    </>
  );
}
