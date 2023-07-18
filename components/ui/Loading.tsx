import Image from 'next/image'

export default function Loading() {
  return (
    <div className='z-10 fixed inset-0 h-screen w-screen bg-white/80 flex items-center justify-center'>
      <Image
        src={'/images/logo.png'}
        alt={'Fruit Mart'}
        width={300}
        height={200}
        className='z-100 animate-pulse object-contain border border-white rounded-full h-64 w-64 p-4'
      />
    </div>
  )
}
