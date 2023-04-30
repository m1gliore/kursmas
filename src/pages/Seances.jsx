import styled from "styled-components";
import {DateTime} from "luxon";
import {month, seancesDates} from "../myLibrary";
import {useEffect, useRef, useState} from "react";
import Modal from "../components/Modal";
import {useLocation, useNavigate} from "react-router-dom";
import {getMethod, postMethod} from "../httpMethodsHandlers";
import jwtDecode from "jwt-decode";
import {useLocalStorage} from "react-use";
import {useForm} from "react-hook-form";
import {AddOutlined} from "@mui/icons-material";

const Wrapper = styled.div`
  position: relative;
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

const AddIcon = styled(AddOutlined)`
  position: absolute;
  top: 1vw;
  right: 3.5vw;
  cursor: pointer;
  transition: .8s ease-out;

  &:hover {
    opacity: .5;
  }
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1vw;
`

const FormInput = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;

  &:hover {
    background-color: #f1f1f1;
  }

  &:focus {
    outline: none;
  }
`

const Seances = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [action, setAction] = useState(0)
    const [currentDate, setCurrentDate] = useState(DateTime.now().day + " " + month(DateTime.now().month))
    const [modalActive, setModalActive] = useState(false)
    const navigate = useNavigate()
    const currentMovie = useLocation().search.split("&")[0].split("m=")[1]
    const movieId = parseInt(useLocation().search.split("&")[0].split("m=")[1].split("-")[0])
    const cinemaRoomNumber = parseInt(useLocation().search.split("&")[1].split("cr=")[1])
    const [seances, setSeances] = useState([])
    const [seanceId, setSeanceId] = useState(null)
    const {register, handleSubmit} = useForm()
    const [user,] = useLocalStorage("user")
    const [currentWindow, setCurrentWindow] = useState(null)
    const [movies, setMovies] = useState([])
    const [cinemaRooms, setCinemaRooms] = useState([])
    let priceTicket = 0
    let number = 0

    useEffect(() => {
        getMethod([{
            url: `http://localhost:8040/api/seances/findAllSeance/${movieId}/${cinemaRoomNumber}`,
            set: setSeances
        }, {
            url: `http://localhost:8040/api/movies/findClientMovies`,
            set: setMovies
        }, {
            url: `http://localhost:8040/api/cinema_room/findAllCinemaRoom`,
            set: setCinemaRooms
        }], {}, [{code: 403, message: "Данные введены неверно"}, {code: 415, message: "Что-то пошло не так"}])
        if (user) {
            setIsAdmin(jwtDecode(user?.token).ADMIN)
        }
    }, [cinemaRoomNumber, movieId, user])

    useRef(movies?.map((movie) => {
        if (movie?.movieId === movieId) {
            return priceTicket = movie?.price
        }
        return null
    }))

    useRef(cinemaRooms?.map((cinemaRoom) => {
        if (cinemaRoom?.cinemaRoomId === cinemaRoomNumber) {
            return number = cinemaRoom?.number
        }
        return null
    }))

    const addSeance = (data) => {
        const formData = new FormData()
        const startTime = data.startTimeAdd
        formData.append("startTime", startTime)
        formData.append("priceTicket", priceTicket)
        formData.append("number", number)
        postMethod(`http://localhost:8040/api/seances/saveNewSeance/${cinemaRoomNumber}/${movieId}`, formData,
            {}, [{code: 403, message: "Данные введены неверно"},
                {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
    }

    return (
        <Wrapper>
            {isAdmin &&
                <AddIcon fontSize="large" onClick={() => {
                    setCurrentWindow("add")
                    setModalActive(true)
                }}/>
            }
            <Container>
                <Title>Выберите дату сеанса</Title>
                <ScheduleContainer>
                    <Title>Расписание</Title>
                    <ScheduleDateContainer onClick={(event) => {
                        !isNaN(parseInt(event.target.dataset.action)) && setAction(parseInt(event.target.dataset.action))
                        setSeanceId(seances?.find((seance) => seance?.startTime === seancesDates[parseInt(event.target.dataset.action)])?.seanceId)
                        setCurrentDate(event.target.innerText)
                        setCurrentWindow("date")
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
                <ModalContainer style={{display: currentWindow !== "date" && "none"}}>
                    <Title>Дата {currentDate} выбрана</Title>
                </ModalContainer>
                <ModalContainer style={{display: currentWindow !== "add" && "none"}}>
                    <Title>Добавить новый сеанс</Title>
                    <Form onSubmit={handleSubmit(addSeance)}>
                        <FormInput required type="date" {...register("startTimeAdd")}
                                   min={DateTime.now().toISO().split("T")[0]}
                                   max={DateTime.now().plus({days: 6}).toISO().split("T")[0]}
                                   placeholder="Номер зала"/>
                        <Button>Добавить</Button>
                    </Form>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Seances