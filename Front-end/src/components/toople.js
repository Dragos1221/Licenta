import MovieCard from "../components/movieCard";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
export default function Toople({ item, getMovieList, addFunction }) {
  const [apear, setApear] = useState(true);
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <MovieCard
        key={item.id}
        details={item}
        refreshList={getMovieList}
      ></MovieCard>
      {apear ? (
        <div
          onClick={() => {
            setApear(false);
          }}
        >
          <AddIcon></AddIcon>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
