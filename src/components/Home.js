import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { GetMovie2 } from '../api';
import Movie from './Movie';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
function Home() {
  const { data, isLoading } = useQuery(['mov'], GetMovie2, {
    retry: true,
  });

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Wrapper>
          {data.data?.movies.map((movie) => (
            <Movie
              cover_image={movie.medium_cover_image}
              title={movie.title}
              id={movie.id}
              summary={movie.summary}
              genres={movie.genres}
              runtime={movie.runtime}
            />
          ))}
        </Wrapper>
      )}
    </>
  );
}

export default Home;
