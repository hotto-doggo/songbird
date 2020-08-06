/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
//   constructor(props) {
//     super(props);
//     // this.state = { score: this.props.score };
//   }

  render() {
    const { score } = this.props;
    return (
      <header>
        <div className="container">
          <div className="row">
            <h1>
              <a href="/">SONGBIRD</a>
            </h1>
            <div>
              <p className="score">Total score: {score}</p>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
