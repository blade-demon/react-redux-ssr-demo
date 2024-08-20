import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

class UsersListPage extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    return (
      <div>
        <h1>Users</h1>
        <ul>
          {this.props.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

// call on server, before client side render.
const loadData = (store) => store.dispatch(fetchUsers());

export default {
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
  loadData,
};
