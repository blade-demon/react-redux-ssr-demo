import React from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../actions";

class UsersList extends React.Component {
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

const loadData = (store) => store.dispatch(fetchUsers());

export { loadData };
export default connect(mapStateToProps, { fetchUsers })(UsersList);
