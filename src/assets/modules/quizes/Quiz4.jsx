/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
// import goToNextQuiz from './goToNextQuiz';

class Quiz4 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <p>Певчие птицы</p>
          <Link step="4" onClick={this.props.goToNext} to="/Хищные птицы">
            Следующий вопрос
          </Link>
        </div>
      </div>
    );
  }
}
export default Quiz4;
