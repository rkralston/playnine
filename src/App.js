import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';

const Stars = (props) => {
  //const numberOfStars = 1 + Math.floor(Math.random()*9);

  return (
    <div className='col-5'>
      {_.range(props.numberOfStars).map(i =>
        <i key={i} className='fa fa-star'></i>
      )}
    </div>
  );
};

const Button = (props) => {
  return (
    <div className='col-2'>
      <button className='btn btn-primary' disabled={props.selectedNumbers.length === 0}>
        =
      </button>
    </div>
  );
};

const Answer = (props) => {
  return (
    <div className='col-5'>
      {props.selectedNumbers.map((number, i) =>
        <span key={i} onClick={() => props.unselectNumber(number)}>
          {number}
        </span>
      )}
    </div>
  );
};

const Numbers = (props) => {
  const numberClassName = (number) => {
    if(props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }
  return (
    <div className='card text-center'>
      <div>
        {Numbers.list.map((number, i) =>
          <span key={i} className={numberClassName(number)}
                onClick={() => props.selectNumber(number)}>
            {number}
          </span> 
        )}
      </div>
    </div>
  );
}

Numbers.list = _.range(0,10);

class Game extends Component{
  state = {
    selectedNumbers: [],
    randomNumberOfStars: 1 + Math.floor(Math.random()*9),
  };

  selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {return;}
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };

  unselectNumber = (clickedNumber) => {
    this.setState(prevState => ({
      selectedNumbers: prevState.selectedNumbers
                            .filter(number => number !== clickedNumber)
    }))
  }

  render() {
    const { selectedNumbers, randomNumberOfStars} = this.state;

    return (
      <div className='container'>
        <header style={{textAlign: 'center'}}>
          <h3>Play Nine</h3>
          <hr />
        </header>
        <div className='row'>
          <Stars numberOfStars={randomNumberOfStars} />
          <Button selectedNumbers={selectedNumbers} />
          <Answer selectedNumbers={selectedNumbers}
                  unselectNumber={this.unselectNumber} />
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers}
                  selectNumber={this.selectNumber} />
      </div>
    )
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Game />
        </div>
      </div>
    );
  }
}

export default App;
