import {type RouteConfig, index, route} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('movie/:movie_id', 'routes/movie/movie_detail.tsx'),
] satisfies RouteConfig;
