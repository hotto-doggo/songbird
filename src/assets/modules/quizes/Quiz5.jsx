/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import goToNextQuiz from './goToNextQuiz';


class Quiz5 extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <p>Хищные птицы</p>
          <Link step='5' onClick={goToNextQuiz} to='/Морские птицы'>Следующий вопрос</Link>
        </div>
      </div>
    );
  }
}
export default Quiz5;
