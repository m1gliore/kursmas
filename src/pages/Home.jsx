import styled from "styled-components";
import {Schedule, ConfirmationNumber, Add, Download} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMethod, postMethod} from "../httpMethodsHadlers";
import {month} from "../myLibrary";
import Modal from "../components/Modal";
import {DateTime} from "luxon";

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

    useEffect(() => {
        getMethod(`http://localhost:8040/api/movies/findClientMovies`, [setMovies])
    }, [])

    const handleSubmitAdd = (event) => {
        postMethod(event, `http://localhost:8040/api/movies/saveNewMovie`,
            {
                title: event.target.title?.value
            }).then(() => navigate(0))
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
                            <FormImage/>
                            <FormLabel style={{cursor: "pointer"}} htmlFor="file"><Download/></FormLabel>
                            <FormInput required style={{display: "none"}} type="file" id="file"/>
                        </LeftFormContainer>
                        <RightFormContainer>
                            <FormInput type="text" placeholder="Наименование фильма"/>
                            <FormInput type="date" min={DateTime.now().toISO().split("T")[0]}
                                       placeholder="Старт показа"/>
                            <FormInput type="date" min={DateTime.now().plus({days: 1}).toISO().split("T")[0]}
                                       placeholder="Конец показа"/>
                            <FormInput type="text" placeholder="Длительность"/>
                            <FormInput type="text" placeholder="Жанры"/>
                            <FormInput type="text" placeholder="Стоимость"/>
                            <FormInput type="text" placeholder="Возрастное ограничение"/>
                            <FormInput type="text" placeholder="ИД трейлера"/>
                            <FormButton>Добавить</FormButton>
                        </RightFormContainer>
                    </Form>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Home