import styled from "styled-components";
import {Schedule, ConfirmationNumber, Add, Download} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMethod, postMethod} from "../httpMethodsHandlers";
import {fileHandler, latinGenre, month, translitRuEn} from "../myLibrary";
import Modal from "../components/Modal";
import {DateTime} from "luxon";
import defaultImage from "../assets/images/default_picture.png"
import {useForm} from "react-hook-form";
import {useLocalStorage} from "react-use";
import jwtDecode from "jwt-decode";
import loading from "../assets/images/loading.png"

const Wrapper = styled.div`
  margin: 1vw 5vw;
  padding: 1vw;
  width: 90vw;
  max-height: fit-content;
  min-height: 64vh;
  background-color: #ececec;
  border-radius: .5vw;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
`

const Container = styled.div`
  width: 100%;
  position: relative;
`

const Title = styled.h1`
  font-size: 1.5rem;
`

const AddIcon = styled(Add)`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  transition: .5s ease-out;

  &:hover {
    opacity: .5;
  }
`

const MovieContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  gap: 2vw;
`

const MovieItem = styled.div`
  display: flex;
  width: 12.5vw;
  flex-direction: column;
  align-items: flex-start;
  gap: .5vw;
  transition: .5s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const MovieImage = styled.img`
  width: 100%;
  height: 35vh;
  object-fit: fill;
  border-radius: 5px;
`

const MovieTitle = styled.p`
  min-height: 5vw;
  margin: .5vw 0;
  font-size: 1.5rem;
  font-weight: 500;
  word-wrap: break-word;
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .25vw;
`

const ScheduleIcon = styled(Schedule)`
  color: #a2a2a2;
`

const MovieDate = styled.span`
  color: #a2a2a2;
`

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: .25vw;
`

const PriceIcon = styled(ConfirmationNumber)`
  color: #a2a2a2;
`

const MoviePrice = styled.span`
  color: #a2a2a2;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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


const Home = () => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [user,] = useLocalStorage("user")
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(defaultImage)
    const {register, handleSubmit} = useForm()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getMethod([{
            url: `http://localhost:8040/api/movies/findClientMovies`,
            set: setMovies
        }], {})
        fileHandler(file, setImageUrl)
        if (user) {
            setIsAdmin(jwtDecode(user?.token).ADMIN)
        }

    }, [file, user])

    const handleSubmitAdd = async (data) => {
        const formData = new FormData()
        const nameMovie = data.nameMovieAdd
        const startDate = data.startDateAdd
        const endDate = data.endDateAdd
        const timeLong = data.timeLongAdd
        const eTypeMovie = latinGenre(data.eTypeMovieAdd)
        const price = data.priceAdd
        const age = data.ageAdd
        const youtube = data.youtubeAdd
        const latinName = translitRuEn(data.nameMovieAdd)
        const file = data.fileAdd[0]
        formData.append("nameMovie", nameMovie)
        formData.append("startDate", startDate)
        formData.append("endDate", endDate)
        formData.append("timeLong", timeLong)
        formData.append("eTypeMovie", eTypeMovie)
        formData.append("price", price)
        formData.append("age", age)
        formData.append("youtube", youtube)
        formData.append("latinName", latinName)
        formData.append("file", file)
        console.log(...formData)
        console.log(JSON.parse(localStorage.getItem("user"))?.token)
        postMethod(`http://localhost:8040/api/movies/saveNewMovie`, formData, {},
            [{code: 403, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
    }

    console.log(movies)

    return (
        <Wrapper>
            <Container>
                <Title>В прокате</Title>
                {isAdmin && <AddIcon fontSize="large" onClick={() => setModalActive(true)}/>}
                <MovieContainer>
                    {movies.map((movie) =>
                        <MovieItem key={movie.movieId}
                                   onClick={() => navigate(`/movies/${movie.movieId + "-" + movie.latinName}`)}>
                            <MovieImage onLoad={() => setIsLoading(false)}
                                        src={"data:" + movie?.imageType + ";base64," + movie?.imagePoster}
                                        alt={movie.imageName}/>
                            <MovieTitle>{movie.nameMovie}</MovieTitle>
                            <DateContainer>
                                <ScheduleIcon/>
                                <MovieDate>по {parseInt(movie.endDate?.split("-")[2])} {month(parseInt(movie.endDate?.split("-")[1]))}</MovieDate>
                            </DateContainer>
                            <PriceContainer>
                                <PriceIcon/>
                                <MoviePrice>{movie.price}.00 рублей</MoviePrice>
                            </PriceContainer>
                        </MovieItem>)}
                </MovieContainer>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer>
                    <Title>Добавить фильм в прокат</Title>
                    <Form onSubmit={handleSubmit(handleSubmitAdd)}>
                        <LeftFormContainer>
                            <FormImage src={imageUrl} alt="Постер фильма"/>
                            <FormLabel style={{cursor: "pointer"}} htmlFor="fileAdd"><Download/></FormLabel>
                            <FormInput required style={{opacity: 0, pointerEvents: "none"}} type="file"
                                       id="fileAdd" {...register("fileAdd")}
                                       onChange={event => setFile(event.target.files[0])} accept="image/*"/>
                        </LeftFormContainer>
                        <RightFormContainer>
                            <FormInput required type="text" {...register("nameMovieAdd")}
                                       placeholder="Наименование фильма"/>
                            <FormInput required type="date" {...register("startDateAdd")}
                                       min={DateTime.now().toISO().split("T")[0]}
                                       placeholder="Старт показа"/>
                            <FormInput required type="date" {...register("endDateAdd")}
                                       min={DateTime.now().plus({days: 1}).toISO().split("T")[0]}
                                       placeholder="Конец показа"/>
                            <FormInput required type="number" {...register("timeLongAdd")} placeholder="Длительность"/>
                            <FormInput required type="text" {...register("eTypeMovieAdd")} placeholder="Жанры"/>
                            <FormInput required type="number" {...register("priceAdd")} placeholder="Стоимость"/>
                            <FormInput required type="number" {...register("ageAdd")}
                                       placeholder="Возрастное ограничение"/>
                            <FormInput required type="text" {...register("youtubeAdd")} placeholder="ИД трейлера"/>
                            <FormButton>Добавить</FormButton>
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

export default Home