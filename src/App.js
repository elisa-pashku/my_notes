import React, { useState, useEffect } from "react";
import * as uuid from "uuid";
import "./App.css";
import NoteForm from "./Components/NoteForm";
import SingleNote from "./Components/SingleNote";
import { Container, Row, Col, Button } from "react-bootstrap";

function App() {
  // Declaring state variables
  const [notes, setNotes] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [show, setShow] = useState(false);
  const [editing, setEditing] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]); //array of filtered notes based on filter
  const [select, setSelect] = useState("asc");

  // Sort use effect
  useEffect(() => {
    let sortedList;
    // eslint-disable-next-line default-case
    switch (select) {
      case "asc":
        sortedList = filteredNotes.sort((note1, note2) =>
          note1.title > note2.title ? -1 : 1
        );
        break;

      case "desc":
        sortedList = filteredNotes.sort((note1, note2) =>
          note1.title < note2.title ? -1 : 1
        );
        break;
    }

    setFilteredNotes(sortedList);
  }, [filteredNotes, select]);

  // Filter use effect
  useEffect(() => {
    const filteredList = notes.filter((note) => note.title.includes(filter));
    setFilteredNotes(filteredList);
  }, [notes, filter]);

  //Getting the value of selected sort
  function handleSelect(event) {
    setSelect(event.target.value);
  }

  // When closing the modal
  const handleClose = () => {
    setShow(false);
    setEditing(false);
  };

  // Editing of modal
  function handleEdit() {
    setEditing(true);
  }

  // Show modal
  function handleShow() {
    setShow(true);
    setIsClicked(false);
  }

  // When you cancel editting a single modal
  function handleEditCancel() {
    setEditing(false);
  }

  function handleAddNote() {
    setIsClicked(true);
  }

  function handleNoteDelete(note) {
    const newNotesArray = notes.filter((noteIndex) => noteIndex.id !== note.id);
    setShow(false);
    setNotes(newNotesArray);
  }

  // It will update the note
  function handleSubmitChanges(note) {
    let newEdittedNotes = [...notes];
    const index = newEdittedNotes.findIndex(
      (oldNote) => oldNote.id === note.id
    );
    newEdittedNotes[index] = note;
    setNotes(newEdittedNotes);
    setEditing(false);
  }

  // Cancel the form which adds notes
  function handleCancel() {
    setIsClicked(false);
  }

  function handleFilter(event) {
    setFilter(event.target.value);
  }

  //Adding the note plus id
  function handleSubmittedNote(note) {
    note.id = uuid.v4();
    setNotes([...notes, note]);
    setIsClicked(false);
  }

  return (
    <Container>
      <Row>
        <Col className="column">
          <div className="logo">My Notes</div>
          <br></br>
          <div>
            <Button className="addButton" onClick={handleAddNote}>
              Add new Note
            </Button>
          </div>
          {isClicked ? (
            <NoteForm
              handleSubmittedNote={handleSubmittedNote}
              handleCancel={handleCancel}
              disabled={editing} // it doesn't show a specific field
              initialValues={{
                title: "",
                description: "",
                categories: "General",
              }}
            />
          ) : (
            <div />
          )}
        </Col>
        <Col>
          <Row className="row">
            <Col>
              <input
                type="text"
                placeholder="Filter"
                value={filter}
                onChange={handleFilter}
              />
            </Col>
            <Col>
              <select value={select} onChange={handleSelect}>
                <option value="asc">Sort A-Z</option>
                <option value="desc">Sort Z-A</option>
              </select>
            </Col>
          </Row>
          {filteredNotes.map((note) => (
            <div className="singleNote">
              <SingleNote
                note={note}
                key={note.id}
                editing={editing}
                handleEdit={handleEdit}
                handleClose={handleClose}
                show={show}
                handleShow={handleShow}
                handleEditCancel={handleEditCancel}
                handleNoteDelete={handleNoteDelete}
                handleSubmitChanges={handleSubmitChanges}
                initialValues={{
                  title: note.title,
                  description: note.description,
                  categories: note.categories,
                  id: note.id,
                }}
              />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
