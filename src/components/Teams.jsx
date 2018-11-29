import React from 'react';
import PropTypes from 'prop-types';

const Teams = ({ teams }) => (
  <ul>
    {teams.map((team, i) => (
      <li key={i}>{team.title}</li>
    ))}
  </ul>
);

Teams.propTypes = {
  teams: PropTypes.array.isRequired
};

export default Teams;
