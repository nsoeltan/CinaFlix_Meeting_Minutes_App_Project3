import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";

import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Notes extends Component {
  state = {
    notes: [],
    meetingTitle: "",
    author: "",
    note: ""
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    API.getNotes()
      .then(res =>
        this.setState({ notes: res.data, meetingTitle: "", author: "", note: "" })
      )
      .catch(err => console.log(err));
  };

  deleteNote = id => {
    API.deleteNote(id)
      .then(res => this.loadNotes())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.meetingTitle && this.state.author) {
      API.saveNote({
        meetingTitle: this.state.meetingTitle,
        author: this.state.author,
        note: this.state.note
      })
        .then(res => this.loadNotes())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            
            <form>
              <Input
                value={this.state.meetingTitle}
                onChange={this.handleInputChange}
                name="meetingTitle"
                placeholder="Agenda (Required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Name Note Taker (Required)"
              />
              <TextArea
                value={this.state.note}
                onChange={this.handleInputChange}
                name="note"
                placeholder="Meeting Notes (Required)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.meetingTitle)}
                onClick={this.handleFormSubmit}
              >
                Add Meeting Minutes
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
           
            {this.state.notes.length ? (
              <List>
                {this.state.notes.map(note => (
                  <ListItem key={note._id}>
                    <Link to={"/notes/" + note._id}>
                      <strong>
                        {note.meetingTitle} by {note.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteNote(note._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Notes;
