import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  padding: 1vw;
  width: 100%;
  height: 68.5vh;
`

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 27vw;
  width: 100%;
  line-height: 1.4;
  text-align: center;
`

const ErrorContainer = styled.div`
  position: relative;
  height: 27.5vh;
`

const Title = styled.h3`
  font-family: 'Cabin', sans-serif;
  position: relative;
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #262626;
  margin: 0;
  letter-spacing: .15vw;
  padding-left: .3vw;
`

const Error = styled.h1`
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 15.75rem;
  font-weight: 900;
  margin: 0 0 0 -1.5vw;
  color: #262626;
  text-transform: uppercase;
  letter-spacing: -2.3vw;
`

const Number = styled.span`
  text-shadow: -.45vw 0 0 #fff;
`

const Description = styled.h2`
  font-family: 'Cabin', sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  color: #000;
  margin: 0 0 1.3vw 0;
`

const NotFound = () => {
    return (
        <Wrapper>
            <Container>
                <ErrorContainer>
                    <Title>Страница не найдена</Title>
                    <Error><Number>4</Number><Number>0</Number><Number>4</Number></Error>
                </ErrorContainer>
                <Description>запрошенная вами страница не найдена</Description>
            </Container>
        </Wrapper>
    )
}

export default NotFound