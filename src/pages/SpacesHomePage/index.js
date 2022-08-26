import React from "react";
import { selectSpaces } from "../../store/spaces/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSpaces } from "../../store/spaces/thunks";
import { SpaceCard } from "../../components/Space";

export default function SpacesHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpaces);
  }, [dispatch]);
  //   if (!spaces) {dispatch(fetchSpaces())};
  // }, []);
  const spaces = useSelector(selectSpaces);
 // console.log("spaces:", spaces);

  return (
    <div style={{ padding:"2vh 5vw",}}>
      {spaces ? (
        spaces.map((space) => (
          <SpaceCard
            key={space.id}
            id={space.id}
            title={space.title}
            description={space.description}
            backgroundColor={space.backgroundColor}
            color={space.color}
          />
        ))
      ) : (
        <p>"Loading..."</p>
      )}
    </div>
  );
}
