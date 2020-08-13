/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { Link, Switch, Route, MemoryRouter as Router } from 'react-router-dom';
import Header from './assets/modules/Header';
import Quiz1 from './assets/modules/quizes/Quiz1';
import Quiz2 from './assets/modules/quizes/Quiz2';
import Quiz3 from './assets/modules/quizes/Quiz3';
import Quiz4 from './assets/modules/quizes/Quiz4';
import Quiz5 from './assets/modules/quizes/Quiz5';
import Quiz6 from './assets/modules/quizes/Quiz6';
import groupsNames from './assets/modules/groupsNames';
import groupsNamesEng from './assets/modules/groupsNamesEng';
import win from './assets/images/win.gif';

import randomInteger from './assets/modules/quizes/randomInteger';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      step: 0,
      currStep: 0,
      isFinished: false,
      randoms: [
        randomInteger(0, groupsNames.length - 1),
        randomInteger(0, groupsNames.length - 1),
        randomInteger(0, groupsNames.length - 1),
        randomInteger(0, groupsNames.length - 1),
        randomInteger(0, groupsNames.length - 1),
        randomInteger(0, groupsNames.length - 1),
      ],
      // answered: [false, false, false, false, false, false],
    };
    this.nextStepSetter = this.nextStepSetter.bind(this);
    this.goToNextQuiz = this.goToNextQuiz.bind(this);
    this.incrementScore = this.incrementScore.bind(this);
    this.finishQuiz = this.finishQuiz.bind(this);
  }

  nextStepSetter() {
    // const newHistory = this.state.answered;
    // newHistory.pop();
    // newHistory.unshift(true);
    console.log(this.state);
    this.setState({
      step: this.state.step + 1,
      // answered: newHistory,
    });
  }

  incrementScore(num) {
    this.setState({
      score: this.state.score + num,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  goToNextQuiz(e) {
    const step = Number(e.target.getAttribute('step'));
    if (this.state.step !== step) {
      e.preventDefault();
    }
    this.setState({
      currStep: this.state.currStep + 1,
    });
    console.log(step);
    console.log(this.state.step);
  }

  finishQuiz() {
    this.setState({
      isFinished: true,
    });
  }

  render() {
    console.log(this.state.randoms);
    const { score } = this.state;
    return (
      <>
        <Router>
          <Header score={score} />
          {/* <button onClick={this.nextStepSetter}>nextStepSetter </button> */}
          <div className="container">
            <div className="row">
              <nav>
                <ul className="list-group list-group-horizontal">
                  {groupsNamesEng.map((group, index) => {
                    console.log(`/${group}`);
                    return (
                      <li
                        className={`list-group-item nav-link ${
                          this.state.currStep === index ? 'active' : ''
                        }`}
                        key={index}
                      >
                        <Link step={index} onClick={this.goToNextQuiz} to={`/${group}`}>
                          {groupsNames[index]}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <Switch>
            {/* <Route path="/">
              <Quiz1
                question={this.state.randoms[0]}
                group="0"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route> */}

            {/* не через цикл с компонентом в рендере */}
            {/* <Route
              path={`/${groupsNamesEng[0]}`}
              render={() => (
                <Quiz1
                  question={this.state.randoms[0]}
                  group="0"
                  isAnswered={false}
                  mistakes={0}
                  properties={this.state}
                  goToNext={this.goToNextQuiz}
                  nextStepSetter={this.nextStepSetter}
                  incrementScore={this.incrementScore}
                />
              )}
            />

            <Route
              path={`/${groupsNamesEng[1]}`}
              render={() => (
                <Quiz2
                  question={this.state.randoms[1]}
                  group="1"
                  isAnswered={false}
                  mistakes={0}
                  properties={this.state}
                  goToNext={this.goToNextQuiz}
                  nextStepSetter={this.nextStepSetter}
                  incrementScore={this.incrementScore}
                />
              )}
            />

            <Route
              path={`/${groupsNamesEng[2]}`}
              render={() => (
                <Quiz3
                  question={this.state.randoms[2]}
                  group="2"
                  isAnswered={false}
                  mistakes={0}
                  properties={this.state}
                  goToNext={this.goToNextQuiz}
                  nextStepSetter={this.nextStepSetter}
                  incrementScore={this.incrementScore}
                />
              )}
            />

            <Route
              path={`/${groupsNamesEng[3]}`}
              render={() => (
                <Quiz4
                  question={this.state.randoms[3]}
                  group="3"
                  isAnswered={false}
                  mistakes={0}
                  properties={this.state}
                  goToNext={this.goToNextQuiz}
                  nextStepSetter={this.nextStepSetter}
                  incrementScore={this.incrementScore}
                />
              )}
            />

            <Route
              path={`/${groupsNamesEng[4]}`}
              render={() => (
                <Quiz5
                  question={this.state.randoms[4]}
                  group="4"
                  isAnswered={false}
                  mistakes={0}
                  properties={this.state}
                  goToNext={this.goToNextQuiz}
                  nextStepSetter={this.nextStepSetter}
                  incrementScore={this.incrementScore}
                />
              )}
            />

            <Route
              path={`/${groupsNamesEng[5]}`}
              render={() => (
                <Quiz6
                  question={this.state.randoms[5]}
                  group="5"
                  isAnswered={false}
                  mistakes={0}
                  properties={this.state}
                  goToNext={this.goToNextQuiz}
                  nextStepSetter={this.nextStepSetter}
                  incrementScore={this.incrementScore}
                />
              )}
            />

            <Route
              exact
              path="/"
              render={() => (
                <Quiz1
                  question={this.state.randoms[0]}
                  group="0"
                  isAnswered={false}
                  mistakes={0}
                  properties={this.state}
                  goToNext={this.goToNextQuiz}
                  nextStepSetter={this.nextStepSetter}
                  incrementScore={this.incrementScore}
                />
              )}
            /> */}

            {/* последний рабочий не через цикл */}
            <Route path={`/${groupsNamesEng[0]}`}>
              <Quiz1
                question={this.state.randoms[0]}
                group="0"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>

            <Route path={`/${groupsNamesEng[1]}`}>
              <Quiz2
                question={this.state.randoms[1]}
                group="1"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>

            <Route path={`/${groupsNamesEng[2]}`}>
              <Quiz3
                question={this.state.randoms[2]}
                group="2"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>

            <Route path={`/${groupsNamesEng[3]}`}>
              <Quiz4
                question={this.state.randoms[3]}
                group="3"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>

            <Route path={`/${groupsNamesEng[4]}`}>
              <Quiz5
                question={this.state.randoms[4]}
                group="4"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>

            <Route path={`/${groupsNamesEng[5]}`}>
              <Quiz6
                question={this.state.randoms[5]}
                group="5"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
                finishQuiz={this.finishQuiz}
              />
            </Route>

            <Route exact path="/">
              <Quiz1
                question={this.state.randoms[0]}
                group="0"
                isAnswered={false}
                mistakes={0}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>

            {/* последний рабочий через цикл
           {groupsNames.map((group, index) => {
            return(
              <Route path={`/${group}`}>
              <Quiz1
                question={this.state.randoms[index]}
                group={index}
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>
            )
          })} */}
          </Switch>
        </Router>
        {this.state.isFinished ? (
          <div className="modal-window">
            <div className="container">
              <div className="row">
                <div className="col-12 content">
                  {this.state.score < 30 ? (
                    <>
                      <h2>
                        Количество баллов, которые вы набрали: {this.state.score}. Попробуйте пройти
                        тест еще раз, чтобы набрать максимальное количество баллов!
                      </h2>
                    </>
                  ) : (
                    <>
                      <h2>
                        Количество баллов, которые вы набрали: {this.state.score}. Поздравляю, это
                        максимально возможное количество баллов за этот тест!!!
                      </h2>
                      <div>
                        <img src={win} alt="win" />
                      </div>
                    </>
                  )}
                  <button
                    onClick={() => {
                      location.reload();
                    }}
                  >
                    Пройти тест еще раз
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
