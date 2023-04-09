import styled from "styled-components";
import {Schedule, ConfirmationNumber, Add, Download} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMethod} from "../httpMethodsHadlers";
import {fileHandler, latinGenre, month, translitRuEn} from "../myLibrary";
import Modal from "../components/Modal";
import {DateTime} from "luxon";
import defaultImage from "../assets/images/default_picture.png"
import axios from "axios";

const Wrapper = styled.div`
  margin: 1vw 5vw;
  padding: 1vw;
  width: 90vw;
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
  align-items: center;
`

const FormImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 10px;
  object-fit: cover;
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

const Home = () => {

    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState(defaultImage)

    useEffect(() => {
        getMethod(`http://localhost:8040/api/movies/findClientMovies`, [setMovies])
        fileHandler(file, setImageUrl)
    }, [file])

    const handleSubmitAdd = async (event) => {
        // postMethod(event, `http://localhost:8040/api/movies/saveNewMovie`,
        //     {
        //         file: file,
        //         nameMovie: event.target.nameMovie?.value,
        //         startDate: event.target.startDate?.value,
        //         endDate: event.target.endDate?.value,
        //         timeLong: event.target.timeLong?.value,
        //         ETypeMovie: latinGenre(event.target.ETypeMovie?.value),
        //         price: event.target.price?.value,
        //         age: event.target.age?.value,
        //         youtube: event.target.youtube?.value,
        //         latinName: translitRuEn(event.target.nameMovie?.value)
        //     }, {
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     })

        event.preventDefault()
        let formData = new FormData()
        let jsonBodyData = {
            nameMovie: event.target.nameMovie?.value,
            startDate: event.target.startDate?.value,
            endDate: event.target.endDate?.value,
            timeLong: event.target.timeLong?.value,
            eTypeMovie: latinGenre(event.target.eTypeMovie?.value),
            price: event.target.price?.value,
            age: event.target.age?.value,
            youtube: event.target.youtube?.value,
            latinName: translitRuEn(event.target.nameMovie?.value)
        }

        formData.append('file', new Blob([file], {type: 'multipart/form-data'}))
        formData.append('movieDTO', new Blob([JSON.stringify(jsonBodyData)], {type: 'application/json'}))

        await axios.post('http://localhost:8040/api/movies/saveNewMovie', formData).then(() => window.location.reload())
    }

    console.log(movies)

    return (
        <Wrapper>
            <Container>
                <Title>В прокате</Title>
                <AddIcon fontSize="large" onClick={() => setModalActive(true)}/>
                <MovieContainer>
                    {movies.map((movie) =>
                        <MovieItem key={movie.movieId} onClick={() => navigate(`/movies/${movie.latinName}`)}>
                            <MovieImage
                                src={movie.movieId === 123 ? "https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    : "https://webgate.24guru.by/uploads/events/thumbs/300x430/1mGun5cpt.jpg"}
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
                    <Form onSubmit={handleSubmitAdd}>
                        <LeftFormContainer>
                            <FormImage src={imageUrl} alt="Постер фильма"/>
                            <FormLabel style={{cursor: "pointer"}} htmlFor="file"><Download/></FormLabel>
                            <FormInput required style={{display: "none"}} type="file" id="file"
                                       onChange={event => setFile(event.target.files[0])}/>
                        </LeftFormContainer>
                        <RightFormContainer>
                            <FormInput required type="text" name="nameMovie" placeholder="Наименование фильма"/>
                            <FormInput required type="date" name="startDate" min={DateTime.now().toISO().split("T")[0]}
                                       placeholder="Старт показа"/>
                            <FormInput required type="date" name="endDate"
                                       min={DateTime.now().plus({days: 1}).toISO().split("T")[0]}
                                       placeholder="Конец показа"/>
                            <FormInput required type="number" name="timeLong" placeholder="Длительность"/>
                            <FormInput required type="text" name="eTypeMovie" placeholder="Жанры"/>
                            <FormInput required type="number" name="price" placeholder="Стоимость"/>
                            <FormInput required type="number" name="age" placeholder="Возрастное ограничение"/>
                            <FormInput required type="text" name="youtube" placeholder="ИД трейлера"/>
                            <FormButton>Добавить</FormButton>
                        </RightFormContainer>
                    </Form>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Home