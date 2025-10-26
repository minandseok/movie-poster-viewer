import {useEffect, useState} from 'react';

export function meta() {
  return [
    {title: 'movie poster viewer'},
    {name: 'description', content: 'View movie posters'},
    {name: 'keywords', content: 'movie, poster, viewer'},
  ];
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold text-center mb-4'>Coin Tracker</h1>
      <form className='flex justify-center mb-4 gap-2'>
        <input
          type='text'
          placeholder='Search coins'
          className='w-full p-2 rounded-lg border border-gray-300'
          onChange={(event) => setSearch(event.target.value)}
        />
      </form>

      {loading ? (
        <strong className='text-gray-500'>Loading...</strong>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3'>
          {coins
            .filter((coin: {name: string}) =>
              coin.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(
              (coin: {
                id: string;
                name: string;
                symbol: string;
                quotes: {USD: {price: number}};
              }) => (
                <div
                  key={coin.id}
                  className='border rounded-lg p-3 shadow-sm hover:shadow-md transition'>
                  <h2 className='font-semibold'>{coin.name}</h2>
                  <p>{coin.symbol}</p>
                  <p className='text-green-600 font-mono'>
                    ${coin.quotes.USD.price.toFixed(2)}
                  </p>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
}
