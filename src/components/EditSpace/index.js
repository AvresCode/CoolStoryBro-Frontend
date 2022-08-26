import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editMySpace } from "../../store/user/actions";
//import { selectUser } from "../../store/user/selectors";

const EditSpace = () => {

   
    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");
    const [color, setColor] = useState("");

    function submitForm(event) {
        event.preventDefault();
        console.log(title, description, backgroundColor, color);
        dispatch(editMySpace(title, description, backgroundColor, color));
        setTitle("");
        setDescription("");
        setBackgroundColor("");
        setColor("");
        setShowForm(false)
      }
  

    return showForm ? (
        <div >
          <form style={{display:"flex", flexDirection:"column"}} onSubmit={submitForm}>
            <h3>Edit your space</h3>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of your space"
              required
            ></input>
    
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description of your space"
            ></input>
    
            <label>Background color:</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            ></input>
    
            <label>Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            ></input>
    
            <button onClick={submitForm} type="submit">
              Save changes
            </button>
            <button
              onClick={() => {
                setShowForm(false);
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => {
            setShowForm(true);
          }}
        >
          Edit my space
        </button>
      );
}

export {EditSpace}