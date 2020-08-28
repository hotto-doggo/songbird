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
      <header className='header'>
        <div className="container">
          <div className="row">
            <h1 className='header__logo'>
              <a href="/">SONGBIRD <i className="fas fa-feather-alt" /></a>
            </h1>
            <div>
              <p className="header__score score">Total score: <span className='header__score-number'>{score}</span></p>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
