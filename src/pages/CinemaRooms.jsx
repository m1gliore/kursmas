import styled from "styled-components";
import {DateTime} from "luxon";
import Modal from "../components/Modal";
import {useEffect, useState} from "react";
import {getMethod, postMethod} from "../httpMethodsHandlers";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";

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
  justify-content: center;
  gap: 10vw;
`

const CinemaRoomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
`

const Title = styled.h1`
  font-size: 1.75rem;
  margin: ${props => props.reply && 0};
`

const CinemaRoomSelect = styled.select`
  min-width: 5vw;
  min-height: 2vw;
  width: fit-content;
  height: fit-content;
  outline-width: 0;
  border-width: 0 0 .1vw 0;
  cursor: pointer;
`

const CinemaRoomOption = styled.option``

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

const CinemaRooms = () => {
    const [modalActive, setModalActive] = useState(false)
    const {register, handleSubmit} = useForm()
    const [cinemaRooms, setCinemaRooms] = useState([])
    const navigate = useNavigate()
    const [cinemaRoomNumber, setCinemaRoomNumber] = useState(1)
    const currentMovie = useLocation().search.split("m=")[1]

    useEffect(() => {
        getMethod([{
            url: `http://localhost:8040/api/cinema_room/findAllCinemaRoom`,
            set: setCinemaRooms
        }], {}, [{code: 403, message: "Данные введены неверно"}, {code: 415, message: "Что-то пошло не так"}])
    }, [])

    cinemaRooms?.sort((a, b) => {
        return a?.number - b?.number
    })

    const handleSubmitAdd = (data) => {
        const formData = new FormData()
        const startTime = data.startTimeAdd
        //change
        const priceTicket = data?.price
        const cinemaRoom = data.cinemaRoomAdd ? data.cinemaRoomAdd : "1"
        formData.append("startTime", startTime)
        formData.append("priceTicket", priceTicket)
        //change cinemaRoom2 to movieId?
        postMethod(`http://localhost:8040/api/seances/saveNewSeance/${cinemaRoom}/${cinemaRoom}`, formData,
            {}, [{code: 403, message: "Данные введены неверно"},
                {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
    }

    return (
        <Wrapper>
            <Container>
                <Title>Выберите зал для сеанса</Title>
                <CinemaRoomContainer>
                    <Title>Зал</Title>
                    <CinemaRoomSelect onChange={(event) => setCinemaRoomNumber(parseInt(event.target.value))}>
                        {cinemaRooms?.map((cinemaRoom) =>
                            <CinemaRoomOption
                                key={cinemaRoom?.cinemaRoomId}
                                value={cinemaRoom?.number}>Номер {cinemaRoom?.number}</CinemaRoomOption>)}
                    </CinemaRoomSelect>
                </CinemaRoomContainer>
                <Button onClick={() => navigate(`/seances?m=${currentMovie}&cr=${cinemaRoomNumber}`)}>Выбрать</Button>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer>
                    <Title>Добавить новый сеанс</Title>
                    <Form onSubmit={handleSubmit(handleSubmitAdd)}>
                        <FormInput required type="date" {...register("startTimeAdd")}
                                   min={DateTime.now().toISO().split("T")[0]}
                                   max={DateTime.now().plus({days: 6}).toISO().split("T")[0]}
                                   placeholder="Старт показа"/>
                        <CinemaRoomSelect {...register("cinemaRoomAdd")}>
                            {cinemaRooms?.map((cinemaRoom) =>
                                <CinemaRoomOption
                                    key={cinemaRoom?.cinemaRoomId}
                                    value={cinemaRoom?.cinemaRoomId}>Зал {cinemaRoom?.number}</CinemaRoomOption>)}
                        </CinemaRoomSelect>
                        <Button>Добавить</Button>
                    </Form>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default CinemaRooms