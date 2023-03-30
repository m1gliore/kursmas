import styled from "styled-components";
import YouTube from "react-youtube";
import {genre, month} from "../myLibrary";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {deleteMethod, getMethod} from "../httpMethodsHadlers";
import {DateTime} from "luxon";
import {Delete} from "@mui/icons-material";
import Modal from "../components/Modal";

const Wrapper = styled.div``

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5vw;
`

const Poster = styled.img`
  width: 100%;
  height: 50vh;
  object-fit: fill;
  border-radius: 5px;
`

const TrailerContainer = styled.div`
  width: 18vw;
  height: 12.9vw;
  border-radius: .5vw;
  overflow: hidden;
  z-index: 1;
  margin-bottom: 2.5vw;
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
`

const Title = styled.h1`
  font-size: 1.75rem;
`

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5vw;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const DeleteIcon = styled(Delete)`
  cursor: pointer;
  transition: .8s ease-out;

  &:hover {
    opacity: .5;
  }
`

const Description = styled.span`
  font-size: 1.25rem;
`

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ScheduleDateContainer = styled.div`
  display: flex;
  gap: .5vw;
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

const CinemaRoomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
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

const SeatsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 25vw;
  height: fit-content;
  gap: 1vw;
`

const Seat = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  background-color: ${props => props.active ? "green" : "red"};
  border-radius: 50%;
  cursor: pointer;

  &:active {
    opacity: .5;
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
  margin-bottom: 2vw;

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

const MovieInfo = () => {

    const opts = {
        height: '225',
        width: '325'
    }

    const movieId = useLocation().pathname.split("/")[2].split("-")[0]
    const [movie, setMovie] = useState({})
    const [cinemaRooms, setCinemaRooms] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getMethod(`http://localhost:8040/api/movies/findMovie/${movieId}`, [setMovie])
        getMethod(`http://localhost:8040/api/cinema_room/findAllCinemaRoom`, [setCinemaRooms])
    }, [movieId])

    cinemaRooms.sort((a, b) => {
        return a.number - b.number
    })

    const handleDelete = (event) => {
        deleteMethod(event, `http://localhost:8040/api/movies/deleteMovieById/${movieId}`, {
            id: movieId
        }).then(() => navigate("/"))
    }

    return (
        <Wrapper>
            <Container>
                <Left>
                    <Poster
                        src={movieId === "123" ? "https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                            : "https://webgate.24guru.by/uploads/events/thumbs/300x430/1mGun5cpt.jpg"}
                        alt="Кот в сапогах"/>
                    <TrailerContainer>
                        <YouTube videoId={movie.youtube} opts={opts} onReady={(event) => event.target.pauseVideo()}/>
                    </TrailerContainer>
                </Left>
                <Right>
                    <TitleContainer>
                        <Title>{movie.nameMovie}</Title>
                        <DeleteIcon fontSize="large" onClick={() => setModalActive(true)}/>
                    </TitleContainer>
                    <DescriptionContainer>
                        <Description>Даты показа:&nbsp;
                            {parseInt(movie.startDate?.split("-")[2])} {month(parseInt(movie.startDate?.split("-")[1]))}
                            &nbsp;-&nbsp;{parseInt(movie.endDate?.split("-")[2])} {month(parseInt(movie.endDate?.split("-")[1]))}</Description>
                        <Description>Длительность: {movie.timeLong} мин.</Description>
                        <Description>Жанры: {genre(movie.etypeMovie)}</Description>
                        <Description>Стоимость: {movie.price}.00р.</Description>
                        <Description>Возрастные ограничения: {movie.age}+</Description>
                    </DescriptionContainer>
                    <ScheduleContainer>
                        <Title>Расписание</Title>
                        <ScheduleDateContainer>
                            <ScheduleDateItem>{DateTime.now().day} {month(DateTime.now().month)}</ScheduleDateItem>
                            <ScheduleDateItem>{DateTime.now().plus({days: 1}).day} {month(DateTime.now().plus({days: 1}).month)}</ScheduleDateItem>
                            <ScheduleDateItem>{DateTime.now().plus({days: 2}).day} {month(DateTime.now().plus({days: 2}).month)}</ScheduleDateItem>
                            <ScheduleDateItem>{DateTime.now().plus({days: 3}).day} {month(DateTime.now().plus({days: 3}).month)}</ScheduleDateItem>
                            <ScheduleDateItem>{DateTime.now().plus({days: 4}).day} {month(DateTime.now().plus({days: 4}).month)}</ScheduleDateItem>
                            <ScheduleDateItem>{DateTime.now().plus({days: 5}).day} {month(DateTime.now().plus({days: 5}).month)}</ScheduleDateItem>
                            <ScheduleDateItem>{DateTime.now().plus({days: 6}).day} {month(DateTime.now().plus({days: 6}).month)}</ScheduleDateItem>
                        </ScheduleDateContainer>
                    </ScheduleContainer>
                    <CinemaRoomContainer>
                        <Title>Места в зале</Title>
                        <CinemaRoomSelect>
                            {cinemaRooms.map((cinemaRoom) => <CinemaRoomOption
                                key={cinemaRoom.cinemaRoomId}>Зал {cinemaRoom.number}</CinemaRoomOption>)}
                        </CinemaRoomSelect>
                    </CinemaRoomContainer>
                    <SeatsContainer>
                        <Seat active></Seat>
                        <Seat active></Seat>
                        <Seat></Seat>
                        <Seat active></Seat>
                    </SeatsContainer>
                    <Button>Приобрести</Button>
                </Right>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer>
                    <Title>Вы действительно хотите удалить фильм?</Title>
                    <Button onClick={handleDelete}>Удалить</Button>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default MovieInfo