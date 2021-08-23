import MovieCard from "../components/movieCardMyList";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import MinimizeIcon from "@material-ui/icons/Minimize";
export default function Toople({ item, getMovieList, addF, delF }) {
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
            addF(item);
          }}
        >
          <AddIcon></AddIcon>
        </div>
      ) : (
        <div
          onClick={() => {
            setApear(true);
            delF(item);
          }}
        >
          <MinimizeIcon> /</MinimizeIcon>
        </div>
      )}
    </div>
  );
}
