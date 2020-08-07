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
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom';
import NotFound from './assets/modules/NotFound';
import Header from './assets/modules/Header';
import Quiz1 from './assets/modules/quizes/Quiz1';
import Quiz2 from './assets/modules/quizes/Quiz2';
import Quiz3 from './assets/modules/quizes/Quiz3';
import Quiz4 from './assets/modules/quizes/Quiz4';
import Quiz5 from './assets/modules/quizes/Quiz5';
import Quiz6 from './assets/modules/quizes/Quiz6';
import birdsData from './assets/modules/birdsData';
import groupsNames from './assets/modules/groupsNames';
import randomInteger from './assets/modules/quizes/randomInteger';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      step: 0,
      // answered: [false, false, false, false, false, false],
    };
    this.nextStepSetter = this.nextStepSetter.bind(this);
    this.goToNextQuiz = this.goToNextQuiz.bind(this);
    this.incrementScore = this.incrementScore.bind(this)
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

  incrementScore(num){
    this.setState({
      score: this.state.score + num
    })
  }

  // eslint-disable-next-line class-methods-use-this
  goToNextQuiz(e) {
    const step = Number(e.target.getAttribute('step'));
    if (this.state.step !== step) {
      e.preventDefault();
    }
    console.log(step);
    console.log(this.state.step);
  }

  render() {
    const { score } = this.state;
    return (
      <>
        <Header score={score} />
        <button onClick={this.nextStepSetter}>nextStepSetter </button>

        <BrowserRouter>
          <div className="container">
            <div className="row">
              <nav>
                <ul className="list-group list-group-horizontal">
                  {groupsNames.map((group, index) => {
                    return (
                      <li className="list-group-item" key={index}>
                        <Link step={index} onClick={this.goToNextQuiz} to={`/${group}`}>
                          {group}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
          <Switch>
            <Route path="/Разминка">
              <Quiz1
                question={randomInteger(0, groupsNames.length)}
                group="0"
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>

            <Route path="/Воробьиные">
              <Quiz2 group="1" properties={this.state} goToNext={this.goToNextQuiz} />
            </Route>
            <Route path="/Лесные птицы">
              <Quiz3 group="2" properties={this.state} goToNext={this.goToNextQuiz} />
            </Route>
            <Route path="/Певчие птицы">
              <Quiz4 group="3" properties={this.state} goToNext={this.goToNextQuiz} />
            </Route>
            <Route path="/Хищные птицы">
              <Quiz5 group="4" properties={this.state} goToNext={this.goToNextQuiz} />
            </Route>
            <Route path="/Морские птицы">
              <Quiz6 group="5" properties={this.state} goToNext={this.goToNextQuiz} />
            </Route>

            <Route>
              <Quiz1
                question={randomInteger(0, groupsNames.length)}
                group="0"
                properties={this.state}
                goToNext={this.goToNextQuiz}
                nextStepSetter={this.nextStepSetter}
                incrementScore={this.incrementScore}
              />
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
