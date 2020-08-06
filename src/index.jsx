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
            <Route path="/Разминка" component={Quiz1} />
            <Route path="/Воробьиные" component={Quiz2} />
            <Route path="/Лесные птицы" component={Quiz3} />
            <Route path="/Певчие птицы" component={Quiz4} />
            <Route path="/Хищные птицы" component={Quiz5} />
            <Route path="/Морские птицы" component={Quiz6} />

            {/* 
            Maksim Pavlov(@Maxvvellh0use)Сегодня, в 19:19
@Maksim Pavlov(@Maxvvellh0use) 
вот так:
<Route path="/Разминка" component={Quiz1} />
и в компонент Quiz1 мне надо передать пропс
@vickymarshmallow(@wviktor93) <Route path="/main/games/audio_call">
                            <AudioCall
                                history={this.props.history}
                            />
                        </Route>
вот так его перепиши
<Route path="/Разминка">
                            <Quiz1 
                                history={this.props.history}
                            />
                        </Route>
             */}

            <Route component={Quiz1} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

const mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);
