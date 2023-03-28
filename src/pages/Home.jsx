import styled from "styled-components";
import {Schedule, ConfirmationNumber} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  margin: 1vw 5vw;
  padding: 1vw;
  width: 90vw;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
`

const Container = styled.div`
  width: 100%;
`

const Title = styled.h1`
  font-size: 1.5rem;
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

const Home = () => {

    const navigate = useNavigate()

    return (
        <Wrapper>
            <Container>
                <Title>В прокате</Title>
                <MovieContainer>
                    <MovieItem onClick={() => navigate("/movies/123-kot-v-sapogah-2-poslednee-zhelanie")}>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                    <MovieItem>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                    <MovieItem>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                    <MovieItem>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                    <MovieItem>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                    <MovieItem>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                    <MovieItem>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                    <MovieItem>
                        <MovieImage src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                                    alt="Кот в сапогах"/>
                        <MovieTitle>Кот в сапогах 2: Последнее желание</MovieTitle>
                        <DateContainer>
                            <ScheduleIcon/>
                            <MovieDate>по 9 апреля</MovieDate>
                        </DateContainer>
                        <PriceContainer>
                            <PriceIcon/>
                            <MoviePrice>до 80.00 рублей</MoviePrice>
                        </PriceContainer>
                    </MovieItem>
                </MovieContainer>
            </Container>
        </Wrapper>
    )
}

export default Home