import React from 'react';
import { MovieType } from '../types/MovieType';

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
