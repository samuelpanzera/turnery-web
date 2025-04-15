import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#ffffff] px-10 py-4">
      <div className="flex justify-between items-center w-full max-w-[1500px] mx-auto text-sm text-gray-600 mb-2 border-b pb-2">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>(31) 99633-7254</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span>
            R. Vila Rica, 1815A - Jardim Montanhês, Belo Horizonte - MG,
            30750-143
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center w-full max-w-[1500px] mx-auto">
        <Image
          alt="Logotipo da empresa"
          width={220}
          height={30}
          src="/assets/logotipo.png"
          className="ml-12"
        />
        <nav className="mr-12 flex gap-6 items-center font-bold [&>a]:relative [&>a]:after:absolute [&>a]:after:bg-black [&>a]:after:h-0.5 [&>a]:after:w-0 [&>a]:after:left-0 [&>a]:after:bottom-0 [&>a]:after:transition-all [&>a:hover]:after:w-full">
          <Link href="/">Home</Link>
          <Link href="/sobre-nos">Sobre nós</Link>
          <Link href="/fale-conosco">Fale Conosco</Link>
          <Link href="/orcamento">Orçamento</Link>
        </nav>
      </div>
    </header>
  );
}
