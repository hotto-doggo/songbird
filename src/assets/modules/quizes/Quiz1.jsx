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
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom';
import birdsData from '../birdsData';

class Quiz1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevAudio: null,
      isAnswered: false,
      mistakes: 0,
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
        console.log('YYAAAAAAAAAASSSSSSSSSSSSS!!!! I GOT TWO FREE TACOS!!!!!!!!!');
        this.setState({
          isAnswered: true,
        });
        this.props.incrementScore(6 - this.state.mistakes)
        this.props.nextStepSetter()
      } else {
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
          <p>Разминка</p>
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

          <div className="col-12">
            <p>{birdsData[group][this.props.question].name}</p>
            <audio
              onPlay={this.playAudio}
              className={`group${group}`}
              controls
              src={birdsData[group][this.props.question].audio}
            />
          </div>

          <BrowserRouter>
            <nav>
              <ul>
                {birdsData[group].map(bird => {
                  return (
                    <li key={bird.name}>
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
                      <p>{bird.name}</p>
                      <audio
                        onPlay={this.playAudio}
                        className={`group${group}`}
                        controls
                        src={bird.audio}
                      />
                    </Fragment>
                  </Route>
                );
              })}
            </Switch>
          </BrowserRouter>
          <Link step="1" onClick={this.props.goToNext} to="/Воробьиные">
            Следующий вопрос
          </Link>
        </div>
      </div>
    );
  }
}
export default Quiz1;
