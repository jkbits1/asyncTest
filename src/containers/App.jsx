import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectSubreddit,
  fetchPostsIfNeeded,
  invalidateSubreddit
} from '../actions';
import Picker from '../components/Picker';
import Teams from '../components/Teams.jsx';

class App extends Component {
  static propTypes = {
    selectedTeam: PropTypes.string.isRequired,
    teams: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, selectedTeam } = this.props;
    dispatch(fetchPostsIfNeeded(selectedTeam));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedTeam !== this.props.selectedTeam) {
      const { dispatch, selectedTeam } = this.props;
      dispatch(fetchPostsIfNeeded(selectedTeam));
    }
  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectSubreddit(nextSubreddit));
  };

  handleRefreshClick = e => {
    e.preventDefault();

    const { dispatch, selectedTeam } = this.props;
    dispatch(invalidateSubreddit(selectedTeam));
    dispatch(fetchPostsIfNeeded(selectedTeam));
  };

  render() {
    const { selectedTeam, teams, isFetching, lastUpdated } = this.props;
    const isEmpty = teams.length === 0;
    return (
      <div>
        xxxs
        <Picker
          value={selectedTeam}
          onChange={this.handleChange}
          options={['reactjs', 'frontend']}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isEmpty ? (
          isFetching ? (
            <h2>Loading...</h2>
          ) : (
            <h2>Empty.</h2>
          )
        ) : (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Teams teams={teams} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedTeam, postsBySubreddit } = state;
  const { isFetching, lastUpdated, items: teams } = postsBySubreddit[
    selectedTeam
  ] || {
    isFetching: true,
    items: []
  };

  return {
    selectedTeam,
    teams,
    isFetching,
    lastUpdated
  };
};

export default connect(mapStateToProps)(App);
