import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-200 py-8 sm:py-12 md:py-15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-yellow-400">
            TornoMix
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Soluções em usinagem, tornearia e manutenção industrial com precisão
            e compromisso.
          </p>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-yellow-400">
            Contato
          </h3>
          <ul className="text-xs sm:text-sm space-y-2">
            <li className="flex items-center gap-2 hover:text-yellow-300 transition-colors justify-center sm:justify-start">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
              <span>(31) 99633-7254</span>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-300 transition-colors justify-center sm:justify-start">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
              <span>contato@tornomix.com.br</span>
            </li>
            <li className="flex items-center gap-2 hover:text-yellow-300 transition-colors justify-center sm:justify-start">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm">
                R. Vila Rica, 1815A - Jardim Montanhês, BH - MG, 30750-143
              </span>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="text-lg sm:text-xl font-semibold mb-3 text-yellow-400">
            Créditos
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            © 2025 TornoMix. Todos os direitos reservados.
          </p>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1">
            Site desenvolvido por Samuel Panzera
          </p>
        </div>
      </div>
    </footer>
  );
}
