import {useLocation, useParams} from 'react-router';

function MovieDetail() {
  const {movieId} = useParams();
  const location = useLocation();
  const {movie} = location.state;
  return (
    <div className='p-4 flex flex-col gap-4'>
      <div className='flex gap-4'>
        <img
          src={movie.medium_cover_image}
          alt={movie.title}
          className='w-1/3 h-auto object-cover rounded-md'
        />
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>{movie.title}</h1>
          <p className='text-sm text-gray-500'>{movie.year}</p>
          <p className='text-sm text-gray-500'>{movie.rating}</p>
          <p className='text-sm text-gray-500'>{movie.runtime}</p>
          <p className='text-sm text-gray-500'>{movie.genres.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
