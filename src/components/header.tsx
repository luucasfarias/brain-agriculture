import Link from "next/link";

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <Link href="/" className="text-2xl font-extrabold">
          Logo marca
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          Primeira funcionalidae
        </div>

      </div>
    </div>
  )
}