/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import goToNextQuiz from './goToNextQuiz';


class Quiz2 extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <p>Воробьиные</p>
          <Link step='2' onClick={goToNextQuiz} to='/Лесные птицы'>Следующий вопрос</Link>
        </div>
      </div>
    );
  }
}
export default Quiz2;
