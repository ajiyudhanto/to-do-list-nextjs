import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'

export default function ToDoForm() {
  const [toDo, setToDo] = useState({
    title: '',
    description: '',
    status: false,
    date: '',
    time: ''
  })

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

  function onSubmitHandler(event) {
    event.preventDefault()
    console.log('submit')
  }

  function clearForm() {
    const newToDo = {
        title: '',
        description: '',
        status: false,
        date: '',
        time: ''
    }
    setToDo(newToDo)
  }

  return(
    <>
      <Form onSubmit={ (event) => onSubmitHandler(event) }>
        <h1>Add Task</h1>
        <Form.Group>
          <Form.Control onChange={ (event) => onChangeHandler(event) } value={ toDo.title } name="title" type="text" placeholder="Name your task" />
        </Form.Group>
        <Form.Group>
          <Form.Control onChange={ (event) => onChangeHandler(event) } value={ toDo.date } name="date" type="date" />
        </Form.Group>
        <Form.Group>
          <Form.Control onChange={ (event) => onChangeHandler(event) } value={ toDo.time } name="time" type="time" />
        </Form.Group>
        <Form.Group>
          <Form.Control onChange={ (event) => onChangeHandler(event) } value={ toDo.description } name="description" as="textarea" rows={5} placeholder="Write description about this task" />
        </Form.Group>
        <Form.Row>
            <Form.Group as={Col}>
                <Button type="submit" block>Add Task</Button>
            </Form.Group>
            <Form.Group as={Col}>
                <Button onClick={ () => clearForm() } block>Clear</Button>
            </Form.Group>
        </Form.Row>
      </Form>
    </>
  )
}