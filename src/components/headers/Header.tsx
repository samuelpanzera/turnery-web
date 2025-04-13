import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-amber-100 shadow justify-items-center flex justify-between">
      <Image
        alt="Logotipo da empresa"
        width={100}
        height={30}
        src="/assets/logotipo.png"
      />

      <nav className="gap-4 flex aling-items-center h-[8%] font-bold">
        <Link href="/">Home</Link>
        <Link href="/sobre-nos">Sobre nós</Link>
        <Link href="/fale-conosco">Fale Conosco</Link>
        <Link href="/orcamento">Orçamento</Link>
      </nav>
    </header>
  );
}
