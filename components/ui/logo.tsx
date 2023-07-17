import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Venlo Seeds">
      <Image
      src='/images/logo.png'
      alt='Venlo Seeds'
      width={200}
      height={200}
      className='object-contain object-center w-32 h-32'
      />
    </Link>
  )
}
