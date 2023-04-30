import styled from "styled-components";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import {fileHandler, genre, latinGenre, month, translitRuEn} from "../myLibrary";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {deleteMethod, getMethod, postMethod, putMethod} from "../httpMethodsHandlers";
import {CreateOutlined, DeleteOutlined, Download, Person} from "@mui/icons-material";
import Modal from "../components/Modal";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {useLocalStorage} from "react-use";
import jwtDecode from "jwt-decode";
import loading from "../assets/images/loading.png";
import {DateTime} from "luxon";
import defaultImage from "../assets/images/default_picture.png";

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
  width: 18vw;
  height: 23.5vw;
  object-fit: cover;
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
  width: 35vw;
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
  align-items: center;
  justify-content: space-evenly;
  gap: 1vw;
`

const LeftFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
`

const FormImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 10px;
  object-fit: contain;
  margin-right: 20px;
`

const FormLabel = styled.label`
  margin-bottom: 10px;
  color: gray;
  font-weight: 600;
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

const RightFormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FormButton = styled.button`
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
    const currentMovie = useLocation().pathname.split("/")[2]
    const [movie, setMovie] = useState({})
    const [replies, setReplies] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [currentWindow, setCurrentWindow] = useState(null)
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const [isLoading, setIsLoading] = useState(true)
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(defaultImage)
    const [username, setUsername] = useState("User")

    useEffect(() => {
        getMethod([{
            url: `http://localhost:8040/api/movies/findMovie/${movieId}`,
            set: setMovie
        }, {
            url: `http://localhost:8040/api/reply/findConfirmReplies`,
            set: setReplies
        }], {}, [{code: 403, message: "Данные введены неверно"}, {code: 415, message: "Что-то пошло не так"}])
        if (user) {
            setIsAdmin(jwtDecode(user?.token).ADMIN)
            setUsername(jwtDecode(user?.token).sub)
        }
        fileHandler(file, setImageUrl)
    }, [file, movieId, user])

    const handleDelete = () => {
        deleteMethod(`http://localhost:8040/api/movies/deleteMovieById/${movieId}`, {},
            [{code: 409, message: "На этот фильм ещё есть сеансы"}]).then(() => navigate("/"))
    }

    const handleSubmitSend = (data) => {
        const formData = new FormData()
        const description = data.descriptionSend
        formData.append("description", description)
        formData.append("username", username)
        postMethod(`http://localhost:8040/api/reply/saveNewReply`, formData, {},
            [{code: 403, message: "Данные введены неверно"},
                {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
    }

    const handleUpdate = (data) => {
        const formData = new FormData()
        const nameMovie = data.nameMovieUpdate
        const startDate = data.startDateUpdate
        const endDate = data.endDateUpdate
        const timeLong = data.timeLongUpdate
        const eTypeMovie = latinGenre(data.eTypeMovieUpdate)
        const price = data.priceUpdate
        const age = data.ageUpdate
        const youtube = data.youtubeUpdate
        const latinName = translitRuEn(data.nameMovieUpdate)
        file ? formData.append("file", file) : formData.append("file", new File([""], "filename.txt"))
        formData.append("movieId", movieId)
        nameMovie && formData.append("nameMovie", nameMovie)
        startDate && formData.append("startDate", startDate)
        endDate && formData.append("endDate", endDate)
        timeLong && formData.append("timeLong", timeLong)
        eTypeMovie && formData.append("eTypeMovie", eTypeMovie)
        price && formData.append("price", price)
        age && formData.append("age", age)
        youtube && formData.append("youtube", youtube)
        nameMovie && formData.append("latinName", latinName)
        formData.append("file", file)
        putMethod(`http://localhost:8040/api/movies/updateMovie`, formData, {},
            [{code: 403, message: "Что-то пошло не так"}])
            .then(() => {
                if (nameMovie) {
                    navigate(`/movies/${movieId + "-" + latinName}`)
                    navigate(0)
                } else {
                    navigate(0)
                }
            })
    }

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
                        <Button onClick={() => navigate(`/cinema-rooms?m=${currentMovie}`)}>Купить билет</Button>
                    </DescriptionContainer>
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
                                        <ReplyDate>
                                            {parseInt(reply?.createReply?.split("-")[2])} {month(parseInt(reply?.createReply?.split("-")[1]))}
                                        </ReplyDate>
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
                <ModalContainer style={{display: currentWindow !== "updateMovie" && "none"}}>
                    <Title>Изменить фильм</Title>
                    <Form onSubmit={handleSubmit(handleUpdate)}>
                        <LeftFormContainer>
                            <FormImage src={imageUrl !== defaultImage ? imageUrl :
                                "data:" + movie?.imageType + ";base64," + movie?.imagePoster}
                                       alt="Постер фильма"/>
                            <FormLabel style={{cursor: "pointer"}} htmlFor="fileAdd"><Download/></FormLabel>
                            <FormInput style={{opacity: 0, pointerEvents: "none"}} type="file"
                                       id="fileAdd" {...register("fileUpdate")}
                                       onChange={event => setFile(event.target.files[0])} accept="image/*"/>
                        </LeftFormContainer>
                        <RightFormContainer>
                            <FormInput required type="text"
                                       defaultValue={movie?.nameMovie} {...register("nameMovieUpdate")}
                                       placeholder="Наименование фильма"/>
                            <FormInput required type="date"
                                       defaultValue={movie?.startDate} {...register("startDateUpdate")}
                                       placeholder="Старт показа"/>
                            <FormInput required type="date" defaultValue={movie?.endDate} {...register("endDateUpdate")}
                                       min={DateTime.now().plus({days: 1}).toISO().split("T")[0]}
                                       placeholder="Конец показа"/>
                            <FormInput required type="number"
                                       defaultValue={movie?.timeLong} {...register("timeLongUpdate")}
                                       placeholder="Длительность"/>
                            <FormInput required type="text"
                                       defaultValue={genre(movie?.etypeMovie)} {...register("eTypeMovieUpdate")}
                                       placeholder="Жанры"/>
                            <FormInput required type="number" defaultValue={movie?.price} {...register("priceUpdate")}
                                       placeholder="Стоимость"/>
                            <FormInput required type="number" defaultValue={movie?.age} {...register("ageUpdate")}
                                       placeholder="Возрастное ограничение"/>
                            <FormInput required type="text" defaultValue={movie?.youtube} {...register("youtubeUpdate")}
                                       placeholder="ИД трейлера"/>
                            <FormButton>Изменить</FormButton>
                        </RightFormContainer>
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