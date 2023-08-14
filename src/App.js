import React, {Component} from 'react';
import './App.css'

export default class App extends Component {

  state = {
    todoData : [

    ],
    value: ''
  }

  btnStyle = {
    color: '#fff',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float: 'right'
  }

  listStyle = (completed) => {
    return {
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: completed ? 'line-through' : 'none'
    }
  }




  handleClick = (id) => {
    let newTodoData = this.state.todoData.filter(data => data.id !== id)
    this.setState({ todoData: newTodoData})
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  handleSubmit = (e) => {
    //form 안에 input을 전송할 때 페이지 리로드 되는 것을 막아줌
    e.preventDefault()

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: this.state.value,
      completed: false,
    }

    //원래 있던 할 일에 새로운 할 일을 더해줌(...은 전개연산자: 기존에 있던 것들)
    this.setState({todoData: [...this.state.todoData, newTodo], value: ''  })
  }

  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data => {
      if(data.id === id){
        data.completed = !data.completed
      }
      return data
    })
    this.setState({todoData: newTodoData})
  }

  render() {
    return(
      <div className='container'>
        <div className='todoBlock'>
          <div className='title'>
            <h1>할 일 목록</h1>
          </div>

          {this.state.todoData.map((data) => (
            <div style={this.listStyle(data.completed)} key={data.id}> 
              <p>
                <input 
                  type='checkbox' 
                  onChange={() => this.handleCompleteChange(data.id)}
                  defaultChecked={false}/>
                {data.title}
                <button style={this.btnStyle} onClick={() => this.handleClick(data.id)}>x</button>
              </p>

            </div>
          ))}

          <form style={{display: 'flex'}} onSubmit={this.handleSubmit}>
            <input 
              type='text' 
              name='value' 
              style={{flex: '10', padding: '5px'}}
              placeholder='해야 할 일을 입력하세요.'
              value={this.state.value}
              onChange={this.handleChange}
              />
            <input
              type='submit'
              value='입력'
              className='btn'
              style={{flex:'1'}}
            />
          </form>

        </div>
      </div>
    )
  }
}