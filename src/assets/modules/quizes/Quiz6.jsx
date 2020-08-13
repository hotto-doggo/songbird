/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable react/jsx-fragments */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from 'react';
import { Link, MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import birdsData from '../birdsData';
import groupsNames from '../groupsNames';
import groupsNamesEng from '../groupsNamesEng';

import defBird from '../../images/birdy_by_rev_mono.gif';

class Quiz6 extends React.Component {
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
    console.log(e.target);
    if (this.state.prevAudio === null) {
      this.setState({ prevAudio: e.target });
      return;
    }
    if (e.target === this.state.prevAudio) {
      return;
    }

    this.state.prevAudio.pause();
    this.setState({ prevAudio: e.target });
  }

  checkAnswer(e) {
    const group = Number(this.props.group);
    const currAnswer = e.target.getAttribute('bird');

    if (!this.state.isAnswered) {
      if (birdsData[group][this.props.question].name === currAnswer) {
        // true answer handling
        // this.properties.success.play()
        e.target.parentNode.classList.add('right');
        console.log('YYAAAAAAAAAASSSSSSSSSSSSS!!!! I GOT TWO FREE TACOS!!!!!!!!!');
        this.setState({
          isAnswered: true,
        });
        this.props.incrementScore(5 - this.state.mistakes);
        this.props.nextStepSetter();
        this.props.finishQuiz();
      } else {
        // false answer handling
        // this.properties.failure.play()
        e.target.parentNode.classList.add('wrong');
        console.log('NOPE');
        this.setState({
          mistakes: this.state.mistakes + 1,
        });
      }
    }
  }

  render() {
    const group = Number(this.props.group);
    console.log(birdsData[group]);

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <p>{groupsNames[group]}</p>
          </div>

          {/* {birdsData[group].map(bird => {
            return (
              <Fragment key={bird.name}>
                <p>{bird.name}</p>
                <audio
                  onPlay={this.playAudio}
                  className={`group${group}`}
                  controls
                  src={bird.audio}
                />
              </Fragment>
            );
          })} */}

          {/* <div className="col-12"> */}
          <div className="current-question-bird col-4">
            <img src={this.state.isAnswered? birdsData[group][this.props.question].image : defBird} alt="bird" />
          </div>
          <div className="col-8">
            <p>{!this.state.isAnswered ? '******' : birdsData[group][this.props.question].name}</p>
            <audio
              onPlay={this.playAudio}
              className={`group${group}`}
              controls
              src={birdsData[group][this.props.question].audio}
            />
          </div>
          {/* </div> */}

          <Router>
            <nav className="col-6">
              <ul>
                {birdsData[group].map(bird => {
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
              {birdsData[group].map(bird => {
                return (
                  <Route key={`/${bird.name}`} path={`/${bird.name}`}>
                    <Fragment key={bird.name}>
                      <div className="col-6">
                        <p>{bird.name}</p>
                        <div className='option__image'>
                          <img className='option__img' src={bird.image} alt={bird.name} />                          
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
                <div className="col-6">
                  <p>
                    Внимательно прослушайте предложенное выше аудио и попробуйте угадать, что за
                    птица поет.
                  </p>
                </div>
              </Route>
            </Switch>
          </Router>
          {group + 1 < groupsNames.length ? (
            <Link
              className={`next-step col-12 ${this.state.isAnswered ? 'active' : ''}`}
              step={group + 1}
              onClick={this.props.goToNext}
              to={`/${groupsNamesEng[group + 1]}`}
            >
              Следующий вопрос
            </Link>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Quiz6;
