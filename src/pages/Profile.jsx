import styled from "styled-components";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import {useLocalStorage} from "react-use";
import {useNavigate} from "react-router-dom";
import {getMethod} from "../httpMethodsHandlers";
import jwtDecode from "jwt-decode";
import {month} from "../myLibrary";

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

const Left = styled.div`
  flex: 1;
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
  flex-direction: column;
  gap: 1.5vw;
`

const RightMenu = styled.div`
  display: flex;
  gap: 1.5vw;
`

const TicketWindow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2vw;
`

const Ticket = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 15vw;
  height: 10vw;
  padding: 1.25vw;
  border-radius: .5vw;
  background: #FBFBFB;
  box-shadow: .05vw .05vw .75vw 0 #a2a2a2;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: .5vw;
    height: .3vw;
    width: 14vw;
  }

  &:before {
    top: -5px;
    background: radial-gradient(circle, transparent, transparent 50%, #FBFBFB 50%, #FBFBFB 100% ) -7px -8px / 16px 16px repeat-x;
  }

  &:after {
    bottom: -5px;
    background: radial-gradient(circle, transparent, transparent 50%, #FBFBFB 50%, #FBFBFB 100% ) -7px -2px / 16px 16px repeat-x;
  }
`

const TicketContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: .5vw;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: .2vw solid #D8D8D8;
  border-radius: .5vw;
  padding: 0 1vw;
`

const TicketDescription = styled.p`
  height: fit-content;
  margin: 0;
  font-size: 1rem;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`

const Button = styled.button`
  width: 10vw;
  padding: .75rem;
  border: none;
  border-radius: .5vw;
  background-color: #c72b2b;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: .25s ease-out;

  &:hover {
    opacity: 0.8;
  }
`

const Profile = () => {

    const [currentWindow, setCurrentWindow] = useState("paid")
    const [modalActive, setModalActive] = useState(false)
    const [user, setUser] = useLocalStorage("user")
    const [username, setUsername] = useState("User")
    const navigate = useNavigate()
    const [archiveTickets, setArchiveTickets] = useState([])
    const [paidTickets, setPaidTickets] = useState([])

    useEffect(() => {
        if (user) {
            setUsername(jwtDecode(user?.token).sub)
        }
        if (username !== "User") {
            getMethod([{
                url: `http://localhost:8040/api/tickets/getClientTicket/${username}/ARCHIVE`,
                set: setArchiveTickets
            }, {
                url: `http://localhost:8040/api/tickets/getClientTicket/${username}/PAID`,
                set: setPaidTickets
            }], {}, [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
        }
    }, [user, username])

    console.log(archiveTickets)

    return (
        <Wrapper>
            <Container>
                <Left>
                    <MenuItem onClick={() => setModalActive(true)}><MenuText>Выйти</MenuText></MenuItem>
                </Left>
                <Right>
                    <RightMenu>
                        <MenuItem onClick={() => setCurrentWindow("paid")}><MenuText>Оплаченные</MenuText></MenuItem>
                        <MenuItem onClick={() => setCurrentWindow("archived")}><MenuText>Архив</MenuText></MenuItem>
                    </RightMenu>
                    <TicketWindow style={{display: currentWindow === "paid" ? "flex" : "none"}}>
                        {paidTickets?.map((ticket) =>
                            <Ticket key={ticket?.ticketId}>
                                <TicketContent>
                                    <TicketDescription>Фильм: {ticket?.nameMovie}</TicketDescription>
                                    <TicketDescription>
                                        Дата: {parseInt(ticket?.startTime?.split("-")[2])} {month(parseInt(ticket?.startTime?.split("-")[1]))}
                                    </TicketDescription>
                                    <TicketDescription>Стоимость: {ticket?.price}.00</TicketDescription>
                                </TicketContent>
                            </Ticket>
                        )}
                    </TicketWindow>
                    <TicketWindow style={{display: currentWindow === "archived" ? "flex" : "none"}}>
                        {archiveTickets?.map((ticket) =>
                            <Ticket key={ticket?.ticketId}>
                                <TicketContent>
                                    <TicketDescription>Фильм: {ticket?.nameMovie}</TicketDescription>
                                    <TicketDescription>
                                        Дата: {parseInt(ticket?.startTime?.split("-")[2])} {month(parseInt(ticket?.startTime?.split("-")[1]))}
                                    </TicketDescription>
                                    <TicketDescription>Стоимость: {ticket?.price}.00</TicketDescription>
                                </TicketContent>
                            </Ticket>
                        )}
                    </TicketWindow>
                </Right>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer>
                    <Title>Вы действительно хотите выйти со своего аккаунта?</Title>
                    <Button onClick={() => {
                        setUser("")
                        navigate("/")
                        navigate(0)
                    }}>Выйти</Button>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Profile