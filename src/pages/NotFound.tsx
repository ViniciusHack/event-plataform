export function NotFound() {
  return (
    <div className="grid place-items-center min-h-screen text-center bg-blur bg-cover">
      <div>
        <h1 className="text-9xl text-green-400">404!</h1>
        <p className="text-gray-200 py-4 text-2xl">Infelizmente não foi possível encontrar o que você procura.</p>
        <span className="text-gray-50 py-4 text-lg">Retornar para a <a href="/" className="text-green-400 hover:text-green-500 font-bold">Home</a></span>
      </div>
    </div>
  )
}