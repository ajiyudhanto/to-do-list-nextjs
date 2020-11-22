import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { Row, Col } from 'react-bootstrap'
import ToDoForm from '../components/ToDoForm'
import withApollo from '../lib/apollo'
import { useQuery, gql } from '@apollo/client'
import ToDo from '../components/ToDo'
import { VerticalTimeline } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

const GET_TODOS = gql`
    query getToDos {
        toDos {
            id
            title
            description
            status
            date
        }
    }
`

const Home = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS)
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

  if (loading) return <p>loading...</p>
  if (error) return <p>{ JSON.stringify(error) }</p>

  return (
    <>
      <Row className={styles.container}>
        <Col xs={4}>
          <ToDoForm refetch={ refetch } />
        </Col>
        <Col>
          <Row>
            <Col xs={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <p style={{ alignSelf: 'flex-end', fontWeight: 'bolder', color: '#3C8258', paddingRight: '25%', marginBottom: '0%' }}>STATUS</p>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <h1 style={{ fontWeight: 'bolder', color: '#eaeaea', paddingRight: '10%' }}>TODO LIST</h1>
            </Col>
          </Row>
          <VerticalTimeline layout={ '1-column-left' }>
            {
              data.toDos.map(toDo => {
                  return <ToDo toDo={ toDo } key={ toDo.id } refetch={ refetch } />
              })
            }
          </VerticalTimeline>
        </Col>
      </Row>
    </>
  )
}

export default withApollo({ ssr: true })(Home)