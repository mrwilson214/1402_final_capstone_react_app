import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const CreateEditDeckForm = ({ deck, formSubmitHandler }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (deck !== undefined) {
      setName(deck.name);
      setDescription(deck.description);
    }
  }, [deck]);

  return (
    <>
      <form onSubmit={() => formSubmitHandler(name, description)}>
        <div>Name</div>
        <input
          id="name"
          type="text"
          placeholder={deck ? "" : "Deck Name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
        <div>Description</div>
        <textarea
          id="description"
          type="text"
          placeholder={deck ? "" : "Brief description of the deck"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
        <br />
        <button
          style={{ marginRight: 10 }}
          onClick={() => history.push(`/`)}
          className="btn-secondary"
        >
          Done
        </button>
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
};

export default CreateEditDeckForm;
