import React from "react";
import { connect } from "react-redux";

import { addNewItem, toggleDone } from "../actions";

class ToDoList extends React.Component {
  state = {
    item: {
      description: ""
    }
  };

  handleInputChanges = e => {
    this.setState({
      item: {
        description: e.target.value
      }
    });
  };

  addItem = e => {
    e.preventDefault();
    const newItem = this.state.item.description;
    this.props.addNewItem(newItem);
    this.setState({
      item: ""
    });
  };

  toggleDone = (e, index) => {
    e.preventDefault();
    this.props.toggleDone(index);
  };

  render() {
    return (
      <div className="todo-app-container">
        <div className="add-item">
          <form onSubmit={this.addItem}>
            <input
              type="text"
              name="newItemInput"
              value={this.state.item.description || ""}
              onChange={this.handleInputChanges}
              placeholder="enter new item"
            />
            <button>Add</button>
          </form>
        </div>

        <div className="task-list">
          <h2>Task List</h2>
          {this.props.items.map((item, index) => (
            <p
              key={index}
              className={item.completed ? "done" : null}
              onClick={e => this.toggleDone(e, index)}
            >
              {item.description}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

export default connect(
  mapStateToProps,
  { addNewItem, toggleDone }
)(ToDoList);
