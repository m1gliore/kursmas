import styled from "styled-components";
import {DateTime} from "luxon";
import {month, seancesDates} from "../myLibrary";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import {useLocation, useNavigate} from "react-router-dom";
import {getMethod} from "../httpMethodsHandlers";
import jwtDecode from "jwt-decode";

const Wrapper = styled.div`
  margin: 1vw 5vw;
  padding: 1vw;
  width: 90vw;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  border-radius: .5vw;
`

const Container = styled.div`
  width: 100%;
  min-height: 62.5vh;
  padding: .5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10vw;
`

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`

const ScheduleDateContainer = styled.div`
  display: flex;
  gap: .5vw;
`

const Title = styled.h1`
  font-size: 1.75rem;
  margin: ${props => props.reply && 0};
`

const ScheduleDateItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4vw;
  height: 5vw;
  border-width: .1vw 0;
  border-style: solid;
  border-color: #e3e3e3;
  cursor: pointer;

  &:hover {
    background-color: #e3e3e3;
  }
`

const Button = styled.button`
  width: 10vw;
  padding: .75rem;
  border: none;
  border-radius: .5vw;
  background-color: #2b97c7;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: .25s ease-out;

  &:hover {
    opacity: 0.8;
  }
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

const Seances = () => {
    const [action, setAction] = useState(0)
    const [currentDate, setCurrentDate] = useState(DateTime.now().day + " " + month(DateTime.now().month))
    const [modalActive, setModalActive] = useState(false)
    const navigate = useNavigate()
    const currentMovie = useLocation().search.split("&")[0].split("m=")[1]
    const movieId = useLocation().search.split("&")[0].split("m=")[1].split("-")[0]
    const cinemaRoomNumber = parseInt(useLocation().search.split("&")[1].split("cr=")[1])
    const [seances, setSeances] = useState([])
    const [seanceId, setSeanceId] = useState(null)

    useEffect(() => {
        getMethod([{
            url: `http://localhost:8040/api/seances/findAllSeance/${movieId}/${cinemaRoomNumber}`,
            set: setSeances
        }], {}, [{code: 403, message: "Данные введены неверно"}, {code: 415, message: "Что-то пошло не так"}])
    }, [cinemaRoomNumber, movieId])

    console.log(seances)

    return (
        <Wrapper>
            <Container>
                <Title>Выберите дату сеанса</Title>
                <ScheduleContainer>
                    <Title>Расписание</Title>
                    <ScheduleDateContainer onClick={(event) => {
                        !isNaN(parseInt(event.target.dataset.action)) && setAction(parseInt(event.target.dataset.action))
                        setSeanceId(seances?.find((seance) => seance?.startTime === seancesDates[parseInt(event.target.dataset.action)])?.seanceId)
                        setCurrentDate(event.target.innerText)
                        setModalActive(true)
                    }}>
                        <ScheduleDateItem
                            data-action="0">{DateTime.now().day} {month(DateTime.now().month)}</ScheduleDateItem>
                        <ScheduleDateItem
                            data-action="1">{DateTime.now().plus({days: 1}).day} {month(DateTime.now().plus({days: 1}).month)}</ScheduleDateItem>
                        <ScheduleDateItem
                            data-action="2">{DateTime.now().plus({days: 2}).day} {month(DateTime.now().plus({days: 2}).month)}</ScheduleDateItem>
                        <ScheduleDateItem
                            data-action="3">{DateTime.now().plus({days: 3}).day} {month(DateTime.now().plus({days: 3}).month)}</ScheduleDateItem>
                        <ScheduleDateItem
                            data-action="4">{DateTime.now().plus({days: 4}).day} {month(DateTime.now().plus({days: 4}).month)}</ScheduleDateItem>
                        <ScheduleDateItem
                            data-action="5">{DateTime.now().plus({days: 5}).day} {month(DateTime.now().plus({days: 5}).month)}</ScheduleDateItem>
                        <ScheduleDateItem
                            data-action="6">{DateTime.now().plus({days: 6}).day} {month(DateTime.now().plus({days: 6}).month)}</ScheduleDateItem>
                    </ScheduleDateContainer>
                </ScheduleContainer>
                <Button
                    onClick={() => {
                        seanceId
                            ? navigate(`/tickets?m=${currentMovie}&cr=${cinemaRoomNumber}&a=${action}&s=${seanceId}`)
                            : alert("Выберите дату!")
                    }}>Выбрать</Button>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer>
                    <Title>Дата {currentDate} выбрана</Title>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Seances