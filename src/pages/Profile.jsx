import styled from "styled-components";

const Wrapper = styled.div`
  margin: 1vw 5vw;
  padding: 1vw;
  width: 90vw;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
`

const Container = styled.div`
  width: 100%;
  padding: .5rem 2rem;
  display: flex;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5vw;
`

const MenuItem = styled.div`
  width: fit-content;

  &:hover {
    opacity: .5;
  }
`

const MenuText = styled.p`
  font-size: 1.5rem;
  margin: 0;
  cursor: pointer;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  gap: 1.5vw;
`

const TicketWindow = styled.div``

const Ticket = styled.div``

const TicketDescription = styled.div``

const Profile = () => {
    return (
        <Wrapper>
            <Container>
                <Left>
                    <MenuItem><MenuText>Заказы</MenuText></MenuItem>
                    <MenuItem><MenuText>Выйти</MenuText></MenuItem>
                </Left>
                <Right>
                    <MenuItem><MenuText>Оплаченные</MenuText></MenuItem>
                    <MenuItem><MenuText>Архив</MenuText></MenuItem>
                    <TicketWindow>
                        <Ticket>
                            <TicketDescription></TicketDescription>
                            <TicketDescription></TicketDescription>
                        </Ticket>
                    </TicketWindow>
                </Right>
            </Container>
        </Wrapper>
    )
}

export default Profile