import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useMutation, gql } from '@apollo/client'

const ADD_TODO = gql`
    mutation AddToDo($title: String, $description: String, $status: Boolean, $date: String) {
        createToDo(title: $title, description: $description, status: $status, date: $date) {
            title
        }
    }
`

export default function ToDoForm(props) {
  const [addToDo] = useMutation(ADD_TODO)
  const { refetch } = props
  
  const [toDo, setToDo] = useState({
    title: '',
    description: '',
    status: false,
    date: ''
  })

  const [date, setDate] = useState({
    day: new Date().getDay(),
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    time: new Date().toLocaleTimeString()
  })
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  useEffect(() => {
    setInterval(getTimeNow, 1000)
  }, [])

  function getTimeNow() {
    setDate({
      day: new Date().getDay(),
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      time: new Date().toLocaleTimeString()
    })
  }

  function onChangeHandler(event) {
    if (event.target.name === 'date') {
        let newDate = new Date(event.target.value)
        if(newDate < new Date()) {
            console.log('kurang')
        } else {
            let newToDo = JSON.parse(JSON.stringify(toDo))
            newToDo[event.target.name] = event.target.value
            setToDo(newToDo)
        }
    } else {
        let newToDo = JSON.parse(JSON.stringify(toDo))
        newToDo[event.target.name] = event.target.value
        setToDo(newToDo)
    }
  }

  async function onSubmitHandler(event) {
    event.preventDefault()
    if (!toDo.title || !toDo.description || !toDo.date) {
      
    } else {
      const result = await addToDo({ variables: toDo })
      refetch()
      clearForm()
    }
  }

  function clearForm() {
    const newToDo = {
        title: '',
        description: '',
        status: false,
        date: ''
    }
    setToDo(newToDo)
  }

  return(
    <div style={{ position: 'sticky', top: '5%' }}>
      <h1 className='white-text' style={{ fontSize: '400%', marginBottom: 0 }}>{ date.time }</h1>
      <h1 className='white-text' style={{ fontSize: '160%', marginBottom: '15%' }}>{ days[date.day] }, { date.date } { months[date.month] } { date.year }</h1>
      <Row>
        <Col>       
          <Form onSubmit={ (event) => onSubmitHandler(event) }>
            <h1 style={{ fontWeight: 'bolder', color: '#eaeaea', textAlign: 'center' }}>ADD TASK</h1>
            <Form.Group>
              <Form.Control onChange={ (event) => onChangeHandler(event) } value={ toDo.title } name="title" type="text" placeholder="Name your task" />
            </Form.Group>
            <Form.Group>
              <Form.Control onChange={ (event) => onChangeHandler(event) } value={ toDo.date } name="date" type="date" />
            </Form.Group>
            <Form.Group>
              <Form.Control onChange={ (event) => onChangeHandler(event) } value={ toDo.description } name="description" as="textarea" rows={5} placeholder="Write description about this task" />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col}>
                    <Button type="submit" className='form-button' block>Add Task</Button>
                </Form.Group>
                <Form.Group as={Col}>
                    <Button onClick={ () => clearForm() } className='form-button' block>Clear</Button>
                </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </div>
  )
}