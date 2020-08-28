/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
//   constructor(props) {
//     super(props);

//   }

  render() {
    const { score } = this.props;
    return (
      <header>
        <div className="container header">
          <div className="row">
            <h1 className='header__logo'>
              <a href="/">SONGBIRD</a>
            </h1>
            <div>
              <p className="header__score score">Total score: {score}</p>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
