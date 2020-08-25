/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/media-has-caption */

import React, { Fragment } from 'react';
import { Link, MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import birdsData from '../birdsData';
import groupsNames from '../groupsNames';
import groupsNamesEng from '../groupsNamesEng';

import defBird from '../../images/birdy_by_rev_mono.gif';

class Quiz5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevAudio: null,
      isAnswered: this.props.isAnswered,
      mistakes: this.props.mistakes,
    };

    this.playAudio = this.playAudio.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
  }

  playAudio(e) {
    const { prevAudio } = this.state;
    if (prevAudio === null) {
      this.setState({ prevAudio: e.target });
      return;
    }
    if (e.target === prevAudio) {
      return;
    }

    prevAudio.pause();
    this.setState({ prevAudio: e.target });
  }

  checkAnswer(e) {
    const { group, question, incrementScore, nextStepSetter } = this.props;
    const { isAnswered, mistakes } = this.state;
    const currAnswer = e.target.getAttribute('bird');

    if (!isAnswered) {
      if (birdsData[Number(group)][question].name === currAnswer) {
        e.target.parentNode.classList.add('right');

        this.setState({
          isAnswered: true,
        });
        incrementScore(5 - mistakes);
        nextStepSetter(Number(group));
        // if (properties.step === groupsNames.length - 1) {
        //   finishQuiz();
        // }
      } else {
        e.target.parentNode.classList.add('wrong');

        this.setState({
          mistakes: mistakes + 1,
        });
      }
    }
  }

  render() {
    const { group, question, goToNext, finishQuiz } = this.props;
    const { isAnswered } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p>{groupsNames[Number(group)]}</p>
          </div>

          <div className="current-question-bird col-8 col-md-4">
            <img src={isAnswered ? birdsData[Number(group)][question].image : defBird} alt="bird" />
          </div>
          <div className="col-12 col-md-8">
            <p>{!isAnswered ? '******' : birdsData[Number(group)][question].name}</p>
            <audio
              onPlay={this.playAudio}
              className={`group${group}`}
              controls
              src={birdsData[Number(group)][question].audio}
            />
          </div>

          <Router>
            <nav className="col-12 col-md-6">
              <ul>
                {birdsData[Number(group)].map(bird => {
                  return (
                    <li className="nav-link" key={bird.name}>
                      <Link bird={bird.name} onClick={this.checkAnswer} to={`/${bird.name}`}>
                        {bird.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Switch>
              {birdsData[Number(group)].map(bird => {
                return (
                  <Route key={`/${bird.name}`} path={`/${bird.name}`}>
                    <Fragment key={bird.name}>
                      <div className="col-12  col-md-6">
                        <p>{bird.name}</p>
                        <div className="option__image">
                          <img className="option__img" src={bird.image} alt={bird.name} />
                        </div>
                        <audio
                          onPlay={this.playAudio}
                          className={`group${group}`}
                          controls
                          src={bird.audio}
                        />
                        <p>{bird.species}</p>
                        <p>{bird.description}</p>
                      </div>
                    </Fragment>
                  </Route>
                );
              })}
              <Route>
                <div className="col-12 col-md-6">
                  <p>
                    Внимательно прослушайте предложенное выше аудио и попробуйте угадать, что за
                    птица поет.
                  </p>
                </div>
              </Route>
            </Switch>
          </Router>
          {Number(group) + 1 < groupsNames.length ? (
            <Link
              className={`next-step col-12 ${isAnswered ? 'active' : ''}`}
              step={Number(group) + 1}
              onClick={goToNext}
              to={`/${groupsNamesEng[Number(group) + 1]}`}
            >
              Следующий вопрос
            </Link>
          ) : (
            <button type="button" onClick={isAnswered ? finishQuiz: null} className={`finish-quiz ${isAnswered ? 'active' : ''}`}>
              Показать результат
            </button>
          )}
        </div>
      </div>
    );
  }
}

Quiz5.defaultProps = {
  question: 0,
  group: '0',
  isAnswered: false,
  mistakes: 0,
  goToNext: null,
  nextStepSetter: null,
  incrementScore: null,

  finishQuiz: null,
};

Quiz5.propTypes = {
  question: PropTypes.number,
  group: PropTypes.string,
  isAnswered: PropTypes.bool,
  mistakes: PropTypes.number,
  goToNext: PropTypes.func,
  nextStepSetter: PropTypes.func,
  incrementScore: PropTypes.func,

  finishQuiz: PropTypes.func,
};

export default Quiz5;
