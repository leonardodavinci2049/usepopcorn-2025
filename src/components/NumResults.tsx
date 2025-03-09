import React from 'react';
import { MovieType } from '../data/movies';

interface NumResultsProps {
  movies: MovieType[];
}

const NumResults: React.FC<NumResultsProps> = ({ movies }) => {
  return (
    <div className="justify-self-end text-[1.8rem]">
  Found <strong>{movies.length}</strong> results
    </div>
  );
};

export default NumResults;
