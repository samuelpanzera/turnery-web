import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#ffffff] shadow-2xl flex justify-between items-center px-10 py-4">
      <Image
        alt="Logotipo da empresa"
        width={220}
        height={30}
        src="/assets/logotipo.png"
      />
      <nav className="flex gap-6 items-center font-bold [&>a]:relative [&>a]:after:absolute [&>a]:after:bg-black [&>a]:after:h-0.5 [&>a]:after:w-0 [&>a]:after:left-0 [&>a]:after:bottom-0 [&>a]:after:transition-all [&>a:hover]:after:w-full">
        <Link href="/">Home</Link>
        <Link href="/sobre-nos">Sobre nós</Link>
        <Link href="/fale-conosco">Fale Conosco</Link>
        <Link href="/orcamento">Orçamento</Link>
      </nav>
    </header>
  );
}
