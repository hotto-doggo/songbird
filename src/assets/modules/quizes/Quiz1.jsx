/* eslint-disable lines-between-class-members */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Link } from 'react-router-dom';
import goToNextQuiz from './goToNextQuiz';

class Quiz1 extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <p>Разминка</p>
          <Link step="1" onClick={goToNextQuiz} to="/Воробьиные">
            Следующий вопрос
          </Link>
        </div>
      </div>
    );
  }
}
export default Quiz1;
