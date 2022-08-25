import React from "react";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import { StoryCard } from "../../components/Space";

export default function MySpace() {
  const theUser = useSelector(selectUser);
  console.log("user", theUser);
  const { title, description, color, backgroundColor, stories } = theUser.space;


  return (
    <div>
      <div
        style={{
          color,
          backgroundColor,
          textAlign: "center",
          padding: "2vh 2vw",
        }}
      >
        <h1> {title}</h1>
        <h3> Welcome {theUser.name}! </h3>
        <p>{description}</p>
        <div> {stories? (stories.map ( (story) => {
            const { id, name, content, imageUrl } = story;
            return (
              <div key={id}>
                {" "}
                <StoryCard
                  id={id}
                  name={name}
                  content={content}
                  imageUrl={imageUrl}
                />
              </div>
            );
          })):<p> 'You have no story yet, start writing your first story! '</p>}</div>
      </div>
    </div>
  );
}
