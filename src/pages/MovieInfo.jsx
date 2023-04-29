import styled from "styled-components";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import {genre, month, seancesDates} from "../myLibrary";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {deleteMethod, getMethod, postMethod, putMethod} from "../httpMethodsHandlers";
import {DateTime} from "luxon";
import {Add, CreateOutlined, DeleteOutlined, Person} from "@mui/icons-material";
import Modal from "../components/Modal";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useLocalStorage} from "react-use";
import jwtDecode from "jwt-decode";
import loading from "../assets/images/loading.png";

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
  height: 10.1vw;
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
  margin: ${props => props.reply && 0};
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

const UtilsContainer = styled.div`
  display: flex;
  gap: .5vw;
`

const UpdateIcon = styled(CreateOutlined)`
  cursor: pointer;
  transition: .8s ease-out;

  &:hover {
    opacity: .5;
  }
`

const DeleteIcon = styled(DeleteOutlined)`
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
  gap: 1vw;
`

const ScheduleDateContainer = styled.div`
  display: flex;
  gap: .5vw;
`

const AddIcon = styled(Add)`
  cursor: pointer;
  transition: .8s ease-out;

  &:hover {
    opacity: .5;
  }
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
  background-color: green;
  border-radius: 50%;
  cursor: pointer;

  &:active, &:hover {
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

  &:hover {
    opacity: 0.8;
  }
`

const RepliesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2vw;
`

const TopRepliesContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3vw;
  padding: 2vw;
  background-color: #efefef;
  border-radius: .5vw;
`

const BottomRepliesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2vw;
  margin-bottom: 2vw;
`

const ReplyContainer = styled.div`
  max-width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  padding-top: 2vw;
  border-top: .1vw #cccccc solid;
`

const ReplyInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 1vw;
`

const ReplyInfoLeft = styled.div``

const ReplyIcon = styled(Person)``

const ReplyInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: .25vw;
`

const ReplyUsername = styled.span`
  font-size: 1.5rem;
`

const ReplyDate = styled.span`
  font-size: 1rem;
  color: #a2a2a2;
`

const Reply = styled.span`
  font-size: 1.25rem;
  word-wrap: break-word;
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

const LoadWindow = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .5s;
  z-index: 100;
`

const LoadImage = styled.img`
  width: 10vw;
  height: 10vw;
  animation: rotating 5s linear infinite;

  @keyframes rotating {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

const MovieInfo = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [user,] = useLocalStorage("user")
    const movieId = useLocation().pathname.split("/")[2].split("-")[0]
    const [movie, setMovie] = useState({})
    const [cinemaRooms, setCinemaRooms] = useState([])
    const [replies, setReplies] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [action, setAction] = useState(0)
    const [cinemaRoomNumber, setCinemaRoomNumber] = useState(1)
    const indents = []
    const [seances, setSeances] = useState([])
    const [activeSit, setActiveSit] = useState(null)
    const [activeTicket, setActiveTicket] = useState(0)
    const [currentWindow, setCurrentWindow] = useState(null)
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [username, setUsername] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getMethod(`http://localhost:8040/api/movies/findMovie/${movieId}`, [setMovie], {})
        getMethod(`http://localhost:8040/api/cinema_room/findAllCinemaRoom`, [setCinemaRooms], {})
        getMethod(`http://localhost:8040/api/reply/findConfirmReplies`, [setReplies], {})
        getMethod(`http://localhost:8040/api/seances/findAllSeance/${movieId}/${cinemaRoomNumber}`, [setSeances], {})
        if (user) {
            setIsAdmin(jwtDecode(user?.token).ADMIN)
            setUsername(jwtDecode(user?.token).sub)
        }
    }, [cinemaRoomNumber, movieId, user])

    cinemaRooms?.sort((a, b) => {
        return a?.number - b?.number
    })

    const handleDelete = () => {
        deleteMethod(`http://localhost:8040/api/movies/deleteMovieById/${movieId}`, {},
            [{code: 409, message: "На этот фильм ещё есть сеансы"}]).then(() => navigate("/"))
    }

    const handleSubmitAdd = (data) => {
        const formData = new FormData()
        const startTime = data.startTimeAdd
        const priceTicket = movie?.price
        const cinemaRoom = data.cinemaRoomAdd ? data.cinemaRoomAdd : "1"
        formData.append("startTime", startTime)
        formData.append("priceTicket", priceTicket)
        postMethod(`http://localhost:8040/api/seances/saveNewSeance/${cinemaRoom}/${movieId}`, formData,
            {}, [{code: 403, message: "Данные введены неверно"},
                {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
    }

    const handleSubmitSend = (data) => {
        const formData = new FormData()
        const description = data.descriptionSend
        formData.append("description", description)
        formData.append("username", "Ольга")
        postMethod(`http://localhost:8040/api/reply/saveNewReply`, formData, {},
            [{code: 403, message: "Данные введены неверно"},
                {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
    }

    const handleClickBuy = () => {
        const formData = new FormData()
        const ticketId = activeTicket
        const ETicketStatus = "BOUGHT"
        if (ticketId === 0) {
            alert("Выберите место")
        } else {
            formData.append("ticketId", ticketId)
            formData.append("ETicketStatus", ETicketStatus)
            console.log(...formData)
            if (username) {
                putMethod(`http://localhost:8040/api/tickets/setTicket/${username}`, formData, {},
                    [{code: 403, message: "Выберите место"},
                        {code: 415, message: "Что-то пошло не так"}]).then(() => navigate(0))
            } else {
                alert("Войдите в аккаунт")
            }
        }
    }

    const handleUpdate = () => {
        const formData = new FormData()
        const ticketId = activeTicket
        const ETicketStatus = "BOUGHT"
        if (ticketId === 0) {
            alert("Выберите место")
        } else {
            formData.append("ticketId", ticketId)
            formData.append("ETicketStatus", ETicketStatus)
            console.log(...formData)
            // putMethod(`http://localhost:8040/api/tickets/setTicket/Ольга`, formData, {},
            //     [{code: 403, message: "Выберите место"},
            //         {code: 415, message: "Что-то пошло не так"}]).then(() => navigate(0))
        }
    }

    cinemaRooms?.map((cinemaRoom) => {
        if (cinemaRoom?.number === cinemaRoomNumber) {
            for (let i = 0; i < cinemaRoom?.numberOfSits; i++) {
                indents.push(<Seat key={i} onClick={() => {
                    setActiveSit(i + 1)
                    setCurrentWindow("activeSit")
                    setModalActive(true)
                    seances?.map((seance) => {
                        return seance?.startTime === seancesDates[action] && setActiveTicket(seance?.ticketDTOSet[i]?.ticketId)
                    })
                }}></Seat>)
            }
        }
        return indents
    })


    for (let i = 0; i < indents.length; i++) {
        seances?.map((seance) => seance?.ticketDTOSet?.forEach((ticket) => {
            if (seance?.startTime === seancesDates[action] && ticket?.number === cinemaRoomNumber && ticket?.sit === i + 1
                && ticket?.eticketStatus === "BOUGHT") {
                indents[i] = <Seat key={i}
                                   style={{backgroundColor: ticket.number === cinemaRoomNumber && ticket?.sit === i + 1 && "red"}}></Seat>
            }
        }))
    }

    seances?.map((seance) => {
        return seance?.ticketDTOSet?.sort((a, b) => {
            return a?.ticketId - b?.ticketId
        })
    })

    return (
        <Wrapper>
            <Container>
                <Left>
                    <Poster
                        src={"data:" + movie?.imageType + ";base64," + movie?.imagePoster}
                        alt="Кот в сапогах"
                        onLoad={() => setIsLoading(false)}/>
                    <TrailerContainer>
                        <LiteYouTubeEmbed id={movie.youtube} adNetwork={true} params="" playlist={false}
                                          playlistCoverId={movie.youtube} poster="hqdefault" title="Кот в сапогах"
                                          noCookie={true}/>
                    </TrailerContainer>
                </Left>
                <Right>
                    <TitleContainer>
                        <Title>{movie.nameMovie}</Title>
                        {isAdmin &&
                            <UtilsContainer>
                                <UpdateIcon fontSize="large" onClick={() => {
                                    setCurrentWindow("updateMovie")
                                    setModalActive(true)
                                }}/>
                                <DeleteIcon fontSize="large" onClick={() => {
                                    setCurrentWindow("deleteMovie")
                                    setModalActive(true)
                                }}/>
                            </UtilsContainer>
                        }
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
                        <ScheduleDateContainer onClick={(event) => {
                            !isNaN(parseInt(event.target.dataset.action)) && setAction(parseInt(event.target.dataset.action))
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
                        {isAdmin && <AddIcon fontSize="large" onClick={() => {
                            setCurrentWindow("addSeance")
                            setModalActive(true)
                        }}/>}
                    </ScheduleContainer>
                    <CinemaRoomContainer>
                        <Title>Места в зале</Title>
                        <CinemaRoomSelect onChange={(event) => setCinemaRoomNumber(parseInt(event.target.value))}>
                            {cinemaRooms?.map((cinemaRoom) =>
                                <CinemaRoomOption
                                    key={cinemaRoom?.cinemaRoomId}
                                    value={cinemaRoom?.number}>Зал {cinemaRoom?.number}</CinemaRoomOption>)}
                        </CinemaRoomSelect>
                    </CinemaRoomContainer>
                    <SeatsContainer>
                        {seances?.map((seance) => {
                            return seance?.startTime === seancesDates[action] && seance?.ticketDTOSet[0]?.number ===
                                cinemaRoomNumber && indents?.map((indent) => indent)
                        })}
                        {seances.every((seance) => seance.startTime !== seancesDates[action]) &&
                            <Title>Сеансы не найдены</Title>}
                    </SeatsContainer>
                    <Button onClick={handleClickBuy}>Приобрести</Button>
                    <RepliesContainer>
                        <TopRepliesContainerForm onSubmit={handleSubmit(handleSubmitSend)}>
                            <Title reply>Отзывы {replies.length}</Title>
                            <TextField required placeholder="Текст отзыва" {...register("descriptionSend")}
                                       inputProps={{minLength: 15, style: {height: "100px"}}}
                                       variant="filled" style={{height: "100px"}}
                                       InputLabelProps={{style: {height: "100px"}}}
                                       multiline={true}/>
                            <Button>Оставить отзыв</Button>
                        </TopRepliesContainerForm>
                        <BottomRepliesContainer>
                            {replies?.map((reply) => <ReplyContainer key={reply?.replyId}>
                                <ReplyInfo>
                                    <ReplyInfoLeft>
                                        <ReplyIcon fontSize="medium"/>
                                    </ReplyInfoLeft>
                                    <ReplyInfoRight>
                                        <ReplyUsername>{reply?.username}</ReplyUsername>
                                        <ReplyDate>{parseInt(reply?.createReply?.split("-")[2])} {month(parseInt(reply?.createReply?.split("-")[1]))} в
                                            21:29</ReplyDate>
                                    </ReplyInfoRight>
                                </ReplyInfo>
                                <Reply>{reply?.description}</Reply>
                            </ReplyContainer>)}
                        </BottomRepliesContainer>
                    </RepliesContainer>
                </Right>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer style={{display: currentWindow !== "deleteMovie" && "none"}}>
                    <Title>Вы действительно хотите удалить фильм?</Title>
                    <Button onClick={handleSubmit(handleDelete)}>Удалить</Button>
                </ModalContainer>
                <ModalContainer style={{display: currentWindow !== "addSeance" && "none"}}>
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
                <ModalContainer style={{display: currentWindow !== "activeSit" && "none"}}>
                    <Title>Место №{activeSit} выбрано</Title>
                </ModalContainer>
                <ModalContainer style={{display: currentWindow !== "updateMovie" && "none"}}>
                    <Title>Изменить фильм</Title>
                    <Form onSubmit={handleSubmit(handleUpdate)}>

                        <Button>Изменить</Button>
                    </Form>
                </ModalContainer>
            </Modal>
            {isLoading &&
                <LoadWindow>
                    <LoadImage src={loading} alt="LoadingImage"/>
                </LoadWindow>
            }
        </Wrapper>
    )
}

export default MovieInfo