import React from 'react';

function Match({
    match,
}) {
  console.log(match);
    return (
        <div>
            {`${match.leftTeamName} ${match.leftTeam} x ${match.rightTeam} ${match.rightTeamName}`}
        </div>
    );
}

export default Match;