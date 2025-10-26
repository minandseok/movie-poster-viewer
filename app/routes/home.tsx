import {useEffect, useState} from 'react';
import PostBox from '~/components/post_box';

export function meta() {
  return [
    {title: 'movie poster viewer'},
    {name: 'description', content: 'View movie posters'},
    {name: 'keywords', content: 'movie, poster, viewer'},
  ];
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const response = await fetch(
      'https://yts.mx/api/v2/list_movies.json?sort_by=year'
    );
    const data = await response.json();
    setMovies(data.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className='p-4 '>
      <h1 className='text-2xl font-bold text-center'>Movies</h1>
      {loading ? (
        <div className='text-2xl font-bold text-center'>Loading...</div>
      ) : (
        <div className='flex justify-center items-center'>
          <PostBox movies={movies} />
        </div>
      )}
    </div>
  );
}
