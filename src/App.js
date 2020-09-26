import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from "./list-item";
import Button from "./button";

function App() {

  const [theList, updateList] = useState([]);
  const [questions, setQuestions] = useState([]);
  // this.state = {theList: []}
  // this.setState({theList: [1]})
  const [currentInput, updateCurrentInput] = useState('');

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [showNewQuestion, setShowNewQuestion] = useState(false);

  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAnswerOne, setNewQuestionAnswerOne] = useState('');
  const [newQuestionAnswerTwo, setNewQuestionAnswerTwo] = useState('');

  useEffect(() => {
    // console.log('this runs eeverytime any state is updated');
    console.log('this runs once on component mount');

  }, []);




  useEffect(() => {
    // console.log('this runs eeverytime any state is updated');
    console.log('this runs once selectedCategory chnages.');
    const fetchQuestions = async () => {
      let res = await fetch(`http://localhost:3000/api/questions?category=${selectedCategory}`);
      let q = await res.json();
      console.log(q);
      setQuestions(q);
    }
    fetchQuestions();

  }, [selectedCategory])





  useEffect(() => {
    // console.log('run this every time the state variables are updated or changed!');
    console.log('run this when the list is updated!')
  }, [theList])

  useEffect(() => {
    // console.log('run this every time the state variables are updated or changed!');
    // console.log('run this code only once when the component loads up')
  }, [])

  const addItem = () => {
    console.log('yay');
    console.log(currentInput);
    updateList([...theList, currentInput]);
    updateCurrentInput('');
  }

  const onInputChange = (ev) => {
    // console.log(ev.currentTarget.value);
    updateCurrentInput(ev.currentTarget.value);
  }

  // const updateCategory = (num) => {
  //
  // }

  const onNewQuestionSubmit = (event) => {
    event.preventDefault();
    console.log(newQuestionText)
    console.log(newQuestionAnswerOne)
    console.log(newQuestionAnswerTwo)

    fetch('http://localhost:3000/api/questions', {method: 'POST', body: JSON.stringify({
        "questionText": newQuestionText,
        "answerOne": newQuestionAnswerOne,
        "answerTwo": newQuestionAnswerTwo,
        "category": selectedCategory
      }), headers: {
        'Content-Type': 'application/json'
      }});

    setNewQuestionText('');
    setNewQuestionAnswerTwo('');
    setNewQuestionAnswerOne('');

    setShowNewQuestion(false)

  }

  return (
    <div className="App">


      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Questions App</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
      </nav>


      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3" style={{borderRight: '1px solid #ddd', paddingTop: '15px', minHeight: '100vh'}}>

            <ul className="list-group">
              <li onClick={() => {
                setSelectedCategory(1);
              }} className={selectedCategory==1 ? "list-group-item active" : "list-group-item"}>Category 1</li>
              <li onClick={() => {
                setSelectedCategory(2);
              }} className={selectedCategory==2 ? "list-group-item active" : "list-group-item"}>Category 2</li>
              <li onClick={() => {
                setSelectedCategory(3);
              }} className={selectedCategory==3 ? "list-group-item active" : "list-group-item"}>Category 3</li>
              <li onClick={() => {
                setSelectedCategory(4);
              }} className={selectedCategory==4 ? "list-group-item active" : "list-group-item"}>Category 4</li>
              <li onClick={() => {
                setSelectedCategory(5);
              }} className={selectedCategory==5 ? "list-group-item active" : "list-group-item"}>Category 5</li>
            </ul>


          </div>
          <div className="col-md-9" style={{padding: '20px'}}>



            {/*Select a category to view it's questions.*/}

            <br/>


            {showNewQuestion && <div>

              <form onSubmit={onNewQuestionSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Question Text</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={newQuestionText} onChange={(ev) => {
                    setNewQuestionText(ev.currentTarget.value)
                  }} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Answer 1</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" value={newQuestionAnswerOne} onChange={(ev) => {
                    setNewQuestionAnswerOne(ev.currentTarget.value)
                  }} />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Answer 2</label>
                  <input type="text" className="form-control" id="exampleFormControlInput1" value={newQuestionAnswerTwo} onChange={(ev) => {
                    setNewQuestionAnswerTwo(ev.currentTarget.value)
                  }} />
                </div>
                <button type="submit" className="btn btn-primary">Submit Question</button>&nbsp;&nbsp;
                <button type="button" className="btn btn-primary" onClick={() => {
                  setShowNewQuestion(false);
                }}>Back to Questions</button>
              </form>

              <br/>
              <br/>

            </div>}

            {!showNewQuestion && <div>

              <button type="button" className="btn btn-primary" onClick={() => {
                setShowNewQuestion(true);
              }}>New Question</button>
              <br/>
              <br/>


              {/*<p>*/}
              {/*  Show the questions for category: {selectedCategory}*/}
              {/*</p>*/}

              <table className="table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Question</th>
                  <th scope="col">Answer 1</th>
                  <th scope="col">Answer 2</th>
                </tr>
                </thead>
                <tbody>
                {questions && questions.map((question, idx) => {
                  return <tr key={idx}>
                    <th scope="row">{idx+1}</th>
                    <td>{question.questionText}</td>
                    <td>{question.answerOne}</td>
                    <td>{question.answerTwo}</td>
                  </tr>
                })}
                {/*<tr>*/}
                {/*  <th scope="row">1</th>*/}
                {/*  <td>Mark</td>*/}
                {/*  <td>Otto</td>*/}
                {/*  <td>@mdo</td>*/}
                {/*</tr>*/}
                {/*<tr>*/}
                {/*  <th scope="row">2</th>*/}
                {/*  <td>Jacob</td>*/}
                {/*  <td>Thornton</td>*/}
                {/*  <td>@fat</td>*/}
                {/*</tr>*/}
                {/*<tr>*/}
                {/*  <th scope="row">3</th>*/}
                {/*  <td>Larry</td>*/}
                {/*  <td>the Bird</td>*/}
                {/*  <td>@twitter</td>*/}
                {/*</tr>*/}
                </tbody>
              </table>

            </div>}











          </div>
          {/*<div className="col-sm" style={{border: '1px solid #ddd'}}>*/}
          {/*  One of three columns*/}
          {/*</div>*/}
        </div>
      </div>



      {/*<header className="App-header">*/}

      {/*  <input onChange={onInputChange} value={currentInput}/>*/}


      {/*  <br/>*/}
      {/*  <button onClick={addItem}>Add Item</button>*/}

      {/*/!*  allPosts.map((post) => {*!/*/}
      {/*/!*  <ShowPost></ShowPost>*!/*/}
      {/*/!*}*!/*/}


      {/*  /!*{theList.map((item) => {*!/*/}
      {/*  /!*  return <p>*!/*/}
      {/*  /!*    {item}*!/*/}
      {/*  /!*  </p>*!/*/}
      {/*  /!*})}*!/*/}

      {/*  <br/>*/}
      {/*  <br/>*/}

      {/*  <Button buttonText={'Save'} />*/}
      {/*  <br/>*/}
      {/*  <br/>*/}
      {/*  <Button buttonText={'Save'} padding={100} background={'black'} borderRadius={10} />*/}

      {/*  <br/>*/}
      {/*  <br/>*/}
      {/*  <Button buttonText={'Submit'} padding={100} background={'red'} borderRadius={10} />*/}


      {/*  {theList.map((item, index) => {*/}
      {/*    return <ListItem theItem={item} key={index}/>*/}
      {/*  })}*/}







      {/*  /!*<img src={logo} className="App-logo" alt="logo" />*!/*/}
      {/*  /!*<p>*!/*/}
      {/*  /!*  Edit <code>src/App.js</code> and save to reload.*!/*/}
      {/*  /!*</p>*!/*/}
      {/*  /!*<a*!/*/}
      {/*  /!*  className="App-link"*!/*/}
      {/*  /!*  href="https://reactjs.org"*!/*/}
      {/*  /!*  target="_blank"*!/*/}
      {/*  /!*  rel="noopener noreferrer"*!/*/}
      {/*  /!*>*!/*/}
      {/*  /!*  Learn React*!/*/}
      {/*  /!*</a>*!/*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
