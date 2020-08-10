/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-undef */
function checkAnswer(e) {
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

export default checkAnswer
