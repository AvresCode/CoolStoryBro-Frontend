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

  if (!oneSpace)
    return (
      <div>
        <h2> Loading...</h2>
      </div>
    );

  const sortedStories = [...oneSpace.stories].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    //(a, b) => a.createdAt - b.createdAt) 
  

  return (
    <div >
      <div 
        style={{
          color: oneSpace.color,
          backgroundColor: oneSpace.backgroundColor,
          textAlign:"center",
          padding:"2vh 2vw",
        }}
      >
        <h3> {oneSpace.title}</h3>
        <p>{oneSpace.description}</p>
        <div>
          {" "}
          {sortedStories.map((story) => {
            const { id, name, content, imageUrl } = story;
            return (
              <div key={id} >
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
    </div>
  );
}
