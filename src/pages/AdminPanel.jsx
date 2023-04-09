import styled from "styled-components";

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
`

const AdminPanel = () => {
    return (
        <Wrapper>
            <Container>
                AdminHHueesos
            </Container>
        </Wrapper>
    )
}

export default AdminPanel