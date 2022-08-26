import React from "react";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import { StoryCard } from "../../components/Space";
import { deleteOneStory } from "../../store/user/actions";
import { useDispatch } from "react-redux";
import { AddStoryForm } from "../../components/NewStoryForm";
import { EditSpace } from "../../components/EditSpace";
import "./styles.css";

export default function MySpace() {
  const theUser = useSelector(selectUser);
  //  console.log("user", theUser);
  // const { title, description, color, backgroundColor, stories } =
  //   theUser?.space;
  const space = theUser?.space;
  const dispatch = useDispatch();

  return (
    <div>
      {theUser && space && (
        <div
          className="space-container"
          style={{
            color: space.color,
            backgroundColor: space.backgroundColor,
          }}
        >
          <h1> {space.title}</h1>
          <h3> Welcome {theUser?.name}! </h3>
          <p>{space.description}</p>
          <div className="button-container">
            {" "}
            <div>
              {" "}
              <AddStoryForm />
            </div>
            <div>
              <EditSpace />{" "}
            </div>
          </div>
        </div>
      )}
      {theUser &&
        space &&
        space.stories &&
        space.stories.map((story) => {
          const { id, name, content, imageUrl } = story;
          return (
            <div
              key={id}
              style={{
                color: space.color,
                backgroundColor: space.backgroundColor,
                textAlign: "center",
                padding: "2vh 2vw",
              }}
            >
              {" "}
              <StoryCard
                id={id}
                name={name}
                content={content}
                imageUrl={imageUrl}
              />
              <div>
                <button onClick={() => dispatch(deleteOneStory(id))}>
                  {" "}
                  Delete this story!{" "}
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}
