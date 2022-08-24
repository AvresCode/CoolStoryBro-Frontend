import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectSpaceDetails } from "../../store/spaces/selectors";
import { useEffect } from "react";
import { fetchSpaceDetails } from "../../store/spaces/thunks";
import { StoryCard } from "../../components/Space";

export default function SpaceDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const oneSpace = useSelector(selectSpaceDetails);
  useEffect(() => {
    dispatch(fetchSpaceDetails(id));
  }, [dispatch, id]);
  console.log("spaceDetails", oneSpace);

  return (
    <div>
      {oneSpace ? (
        <div style={{color:oneSpace.color, backgroundColor:oneSpace.backgroundColor}}>
          <h3> {oneSpace.title}</h3>
          <p>{oneSpace.description}</p>
          <div>
            {" "}
            {oneSpace.stories.map((story) => {
              const { id, name, content, imageUrl } = story;
              return (
                <div key={id} style={{backgroundImage:imageUrl}}>
                  {" "}
                  <StoryCard
                    id={id}
                    name={name}
                    content={content}
                    imageUrl={imageUrl}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>"Loading..."</p>
      )}
    </div>
  );
}
