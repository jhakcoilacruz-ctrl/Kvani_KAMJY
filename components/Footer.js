import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-surface-container-lowest text-primary-fixed border-t border-white/10 w-full mt-auto">
      <div className="flex flex-col md:flex-row justify-between gap-lg py-xl px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-md md:w-1/3">
          <div className="font-headline-lg text-headline-lg font-black text-tertiary tracking-tighter">KVANI</div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
            Estilo que define tu ciudad. Moda urbana premium, diseño brutalista y actitud sin filtros.
          </p>
        </div>
        <div className="flex flex-col gap-md">
          <h4 className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest">Legal</h4>
          <div className="flex flex-col gap-sm">
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-tertiary transition-colors" href="#">Términos y Condiciones</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-tertiary transition-colors" href="#">Políticas de Privacidad</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-tertiary transition-colors" href="#">Guía de Tallas</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-tertiary transition-colors" href="#">Libro de Reclamaciones</a>
          </div>
        </div>
        <div className="flex flex-col gap-md">
          <h4 className="font-label-caps text-label-caps text-tertiary uppercase tracking-widest">Contacto</h4>
          <div className="flex flex-col gap-sm">
            <a
              className="font-body-md text-body-md text-primary-fixed hover:text-tertiary transition-colors flex items-center gap-xs"
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined">chat</span>
              WhatsApp
            </a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-tertiary transition-colors flex items-center gap-xs" href="#">
              <span className="material-symbols-outlined">mail</span>
              info@kvani.com
            </a>
          </div>
          <div className="flex gap-md mt-sm text-tertiary">
            <a className="hover:text-primary-fixed transition-colors" href="#">IG</a>
            <a className="hover:text-primary-fixed transition-colors" href="#">TK</a>
            <a className="hover:text-primary-fixed transition-colors" href="#">FB</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-md px-margin-mobile md:px-margin-desktop text-center">
        <p className="font-label-caps text-[10px] text-on-surface-variant tracking-widest">
          © {new Date().getFullYear()} KVANI URBAN WEAR. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </div>
    </footer>
  );
}
