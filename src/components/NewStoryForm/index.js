import { useState } from "react";
import { postStoryThunk } from "../../store/user/actions";
import { useDispatch, useSelector } from "react-redux";
//import { selectUser } from "../../store/user/selectors";


const AddStoryForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const dispatch = useDispatch();
  // const user = useSelector(selectUser);
  // const spaceId = user.profile.space.id
  

  const submit = (event) => {
    // to make sure that the form does not redirect (which is normal browser behavior)
    event.preventDefault();

    console.log("new story:", name, content);

  dispatch(postStoryThunk(name, content, image))
    setName("");
    setContent("");
    setImage("");
    setShowForm(false);
    

  };

  return (showForm? (<div>
    <form onSubmit={submit}>
      <h4>Write your story!</h4>
      <p>
        <label>
          Name:{" "}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Content:{" "}
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          Image:{" "}
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />   {image ? (
            <img src={image} alt="preview"  />
          ) : null}
        </label>
      </p>
      <p>
        <button type="submit">Add !</button>
      </p>
    </form></div>) : (<button  onClick={() => {
        setShowForm(true);
      }}> Post a cool story bro </button>)
  );
};

export { AddStoryForm };