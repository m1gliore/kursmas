import styled from "styled-components";
import {seancesDates} from "../myLibrary";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getMethod, putMethod} from "../httpMethodsHandlers";
import jwtDecode from "jwt-decode";
import {useLocalStorage} from "react-use";
import Modal from "../components/Modal";

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
  flex-direction: column;
  align-items: center;
  gap: 10vw;
`

const SeatsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 25vw;
  height: fit-content;
  gap: 1vw;
`

const Seat = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  background-color: green;
  border-radius: 50%;
  cursor: pointer;

  &:active, &:hover {
    opacity: .5;
  }
`

const Title = styled.h1`
  font-size: 1.75rem;
  margin: ${props => props.reply && 0};
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

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

const Tickets = () => {
    const action = parseInt(useLocation().search.split("&")[2].split("a=")[1])
    const [user,] = useLocalStorage("user")
    const [username, setUsername] = useState(null)
    const navigate = useNavigate()
    const seanceId = parseInt(useLocation().search.split("&")[3].split("s=")[1])
    const [tickets, setTickets] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const [activeSit, setActiveSit] = useState(0)
    const [activeTicket, setActiveTicket] = useState(0)
    const indents = []

    useEffect(() => {
        getMethod([{
            url: `http://localhost:8040/api/tickets/getTicketsBySeance/${seanceId}`,
            set: setTickets
        }], {}, [{code: 403, message: "Данные введены неверно"}, {code: 415, message: "Что-то пошло не так"}])
        if (user) {
            setUsername(jwtDecode(user?.token).sub)
        }
    }, [seanceId, user])

    useRef(tickets?.map((ticket) => ticket?.startTime === seancesDates[action] && indents.push(ticket)))

    console.log(tickets)

    const handleClickBuy = () => {
        const formData = new FormData()
        const ticketId = activeTicket
        const ETicketStatus = "BOUGHT"
        if (ticketId === 0) {
            alert("Выберите место")
        } else {
            formData.append("ticketId", ticketId)
            formData.append("ETicketStatus", ETicketStatus)
            console.log(...formData)
            if (username) {
                putMethod(`http://localhost:8040/api/tickets/setTicket/${username}`, formData, {},
                    [{code: 403, message: "Выберите место"},
                        {code: 415, message: "Что-то пошло не так"}]).then(() => navigate(0))
            } else {
                alert("Войдите в аккаунт")
            }
        }
    }

    return (
        <Wrapper>
            <Container>
                <Title>Места в зале</Title>
                <SeatsContainer>
                    {indents?.map((ticket, index) => <Seat
                        style={{
                            backgroundColor: ticket?.eticketStatus === "BOUGHT" && "red",
                            pointerEvents: ticket?.eticketStatus === "BOUGHT" && "none"
                        }} key={index}
                        onClick={() => {
                            setActiveSit(index + 1)
                            setModalActive(true)
                            setActiveTicket(ticket?.ticketId)
                        }}></Seat>)}
                    {indents.length === 0 && <Title>Билетов не найдено</Title>}
                </SeatsContainer>
                <Button onClick={handleClickBuy}>Приобрести</Button>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer>
                    <Title>Место {activeSit} выбрано</Title>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Tickets