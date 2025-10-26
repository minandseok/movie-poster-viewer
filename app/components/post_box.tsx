import {Link} from 'react-router';

function PostBox({
  movies,
}: {
  movies: {
    id: string;
    title: string;
    year: number;
    medium_cover_image: string;
    rating: number;
    runtime: number;
    genres: string[];
  }[];
}) {
  return (
    <div className='grid grid-cols-3 gap-4 justify-center items-center p-4'>
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movie/${movie.id}`}
          state={{movie: movie}}
          className='border-2 border-gray-300 rounded-md p-4 shadow-md hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer flex flex-col items-center justify-center'>
          <img
            src={movie.medium_cover_image}
            alt={movie.title}
            className='w-full h-full object-cover rounded-md'
          />
          <h2 className='text-lg font-bold'>{movie.title}</h2>
          <p className='text-sm text-gray-500'>{movie.year}</p>
          <p className='text-sm text-gray-500'>⭐ {movie.rating}</p>
          <p className='text-sm text-gray-500'>{movie.runtime} minutes</p>
          <p className='text-sm text-gray-500'>{movie.genres.join(', ')}</p>
        </Link>
      ))}
    </div>
  );
}

export default PostBox;
