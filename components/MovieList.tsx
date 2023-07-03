import useMovieList from "@/hooks/useMovieList";
import React, { FC } from "react";

import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

const MovieList: FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div className="space-y-4">
        <p className="text-white text-lg md:text-xl lg:text-2xl font-semibold ">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie?.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
