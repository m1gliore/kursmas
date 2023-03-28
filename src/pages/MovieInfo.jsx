import styled from "styled-components";
import YouTube from "react-youtube";
import moment from "moment/moment";
import month from "../myLibrary";

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

const MovieInfo = () => {

    const opts = {
        height: '225',
        width: '325'
    }

    return (
        <Wrapper>
            <Container>
                <Left>
                    <Poster src="https://webgate.24guru.by/uploads/events/thumbs/300x430/8gyuDFF3V.jpg"
                            alt="Кот в сапогах"/>
                    <TrailerContainer>
                        <YouTube videoId="XuZdVQli_3w" opts={opts} onReady={(event) => event.target.pauseVideo()}/>
                    </TrailerContainer>
                </Left>
                <Right>
                    <Title>Кот в сапогах 2: Последнее желание</Title>
                    <DescriptionContainer>
                        <Description>Даты показа: 27 марта - 9 апреля</Description>
                        <Description>Длительность: 104 мин.</Description>
                        <Description>Жанр: Комедия, Мультфильм, Приключения</Description>
                        <Description>Стоимость: до 80.00р.</Description>
                        <Description>Возрастные ограничения: 6+</Description>
                    </DescriptionContainer>
                    <ScheduleContainer>
                        <Title>Расписание</Title>
                        <ScheduleDateContainer>
                            <ScheduleDateItem>{moment()._d.getDate()} {month(moment()._d.getMonth())}</ScheduleDateItem>
                            <ScheduleDateItem>{moment().add(1, 'days')._d.getDate()} {month(moment().add(1, 'days')._d.getMonth())}</ScheduleDateItem>
                            <ScheduleDateItem>{moment().add(2, 'days')._d.getDate()} {month(moment().add(2, 'days')._d.getMonth())}</ScheduleDateItem>
                            <ScheduleDateItem>{moment().add(3, 'days')._d.getDate()} {month(moment().add(3, 'days')._d.getMonth())}</ScheduleDateItem>
                            <ScheduleDateItem>{moment().add(4, 'days')._d.getDate()} {month(moment().add(4, 'days')._d.getMonth())}</ScheduleDateItem>
                            <ScheduleDateItem>{moment().add(5, 'days')._d.getDate()} {month(moment().add(5, 'days')._d.getMonth())}</ScheduleDateItem>
                            <ScheduleDateItem>{moment().add(6, 'days')._d.getDate()} {month(moment().add(6, 'days')._d.getMonth())}</ScheduleDateItem>
                        </ScheduleDateContainer>
                    </ScheduleContainer>
                    <Button>Приобрести</Button>
                </Right>
            </Container>
        </Wrapper>
    )
}

export default MovieInfo