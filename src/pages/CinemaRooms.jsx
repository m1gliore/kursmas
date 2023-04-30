import styled from "styled-components";
import Modal from "../components/Modal";
import {useEffect, useState} from "react";
import {deleteMethod, getMethod, postMethod} from "../httpMethodsHandlers";
import {useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router-dom";
import {AddOutlined, CreateOutlined, DeleteOutlined} from "@mui/icons-material";
import {useLocalStorage} from "react-use";
import jwtDecode from "jwt-decode";

const Wrapper = styled.div`
  position: relative;
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
  justify-content: center;
  gap: 10vw;
`

const AddIcon = styled(AddOutlined)`
  position: absolute;
  top: 1vw;
  right: 6vw;
  cursor: pointer;
  transition: .8s ease-out;

  &:hover {
    opacity: .5;
  }
`

const UpdateIcon = styled(CreateOutlined)`
  position: absolute;
  top: 1vw;
  right: 3.5vw;
  cursor: pointer;
  transition: .8s ease-out;

  &:hover {
    opacity: .5;
  }
`

const DeleteIcon = styled(DeleteOutlined)`
  position: absolute;
  top: 1vw;
  right: 1vw;
  cursor: pointer;
  transition: .8s ease-out;

  &:hover {
    opacity: .5;
  }
`

const CinemaRoomContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
`

const Title = styled.h1`
  font-size: 1.75rem;
  margin: ${props => props.reply && 0};
`

const CinemaRoomSelect = styled.select`
  min-width: 5vw;
  min-height: 2vw;
  width: fit-content;
  height: fit-content;
  outline-width: 0;
  border-width: 0 0 .1vw 0;
  cursor: pointer;
`

const CinemaRoomOption = styled.option``

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 1vw;
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

const CinemaRooms = () => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const {register, handleSubmit} = useForm()
    const [cinemaRooms, setCinemaRooms] = useState([])
    const navigate = useNavigate()
    const [cinemaRoomId, setCinemaRoomId] = useState(0)
    const currentMovie = useLocation().search.split("m=")[1]
    const [user,] = useLocalStorage("user")
    const [currentWindow, setCurrentWindow] = useState(null)

    useEffect(() => {
        getMethod([{
            url: `http://localhost:8040/api/cinema_room/findAllCinemaRoom`,
            set: setCinemaRooms
        }], {}, [{code: 403, message: "Данные введены неверно"}, {code: 415, message: "Что-то пошло не так"}])
        if (user) {
            setIsAdmin(jwtDecode(user?.token).ADMIN)
        }
    }, [user])

    cinemaRooms?.sort((a, b) => {
        return a?.number - b?.number
    })

    const addCinemaRoom = (data) => {
        const formData = new FormData()
        const number = data.numberAdd
        const numberOfSits = data.numberOfSitsAdd
        const description = data.descriptionAdd
        formData.append("number", number)
        formData.append("numberOfSits", numberOfSits)
        formData.append("description", description)
        postMethod(`http://localhost:8040/api/cinema_room/saveNewCinemaRoom`, formData,
            {}, [{code: 403, message: "Данные введены неверно"},
                {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
    }

    const updateCinemaRoom = (data) => {
        if (!cinemaRoomId) {
            alert("Выберите зал")
        } else {
            const formData = new FormData()
            const number = data.numberUpdate
            const numberOfSits = data.numberOfSitsUpdate
            const description = data.descriptionUpdate
            formData.append("cinemaRoomId", cinemaRoomId)
            formData.append("number", number)
            formData.append("numberOfSits", numberOfSits)
            formData.append("description", description)
            postMethod(`http://localhost:8040/api/cinema_room/saveNewCinemaRoom`, formData,
                {}, [{code: 403, message: "Данные введены неверно"},
                    {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
        }
    }

    const deleteCinemaRoom = () => {
        if (!cinemaRoomId) {
            alert("Выберите зал")
        } else {
            deleteMethod(`http://localhost:8040/api/cinema_room/deleteCinemaRoom/${cinemaRoomId}`, {},
                [{code: 403, message: "Данные введены неверно"},
                    {code: 415, message: "Что-то пошло не так"}], [], true).then(() => navigate(0))
        }
    }

    return (
        <Wrapper>
            {isAdmin &&
                <>
                    <AddIcon fontSize="large" onClick={() => {
                        setCurrentWindow("add")
                        setModalActive(true)
                    }}/>
                    <UpdateIcon fontSize="large" onClick={() => {
                        setCurrentWindow("update")
                        setModalActive(true)
                    }}/>
                    <DeleteIcon fontSize="large" onClick={() => {
                        setCurrentWindow("delete")
                        setModalActive(true)
                    }}/>
                </>
            }
            <Container>
                <Title>Выберите зал для сеанса</Title>
                <CinemaRoomContainer>
                    <Title>Зал</Title>
                    <CinemaRoomSelect defaultValue=""
                                      onChange={(event) => setCinemaRoomId(parseInt(event.target.value))}>
                        <CinemaRoomOption value="" disabled>Выберите зал</CinemaRoomOption>
                        {cinemaRooms?.map((cinemaRoom) =>
                            <CinemaRoomOption
                                key={cinemaRoom?.cinemaRoomId}
                                value={cinemaRoom?.cinemaRoomId}>Номер {cinemaRoom?.number}</CinemaRoomOption>)}
                    </CinemaRoomSelect>
                </CinemaRoomContainer>
                <Button onClick={() => navigate(`/seances?m=${currentMovie}&cr=${cinemaRoomId}`)}>Выбрать</Button>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer style={{display: currentWindow !== "add" && "none"}}>
                    <Title>Добавить новый зал</Title>
                    <Form onSubmit={handleSubmit(addCinemaRoom)}>
                        <FormInput required type="number" {...register("numberAdd")}
                                   min="1" placeholder="Номер зала"/>
                        <FormInput required type="number" {...register("numberOfSitsAdd")}
                                   min="1" placeholder="Количество мест"/>
                        <FormInput required type="text" {...register("descriptionAdd")} placeholder="Описание"/>
                        <Button>Добавить</Button>
                    </Form>
                </ModalContainer>
                <ModalContainer style={{display: currentWindow !== "update" && "none"}}>
                    <Title>Изменить зал</Title>
                    <Form onSubmit={handleSubmit(updateCinemaRoom)}>
                        <FormInput required type="number" {...register("numberUpdate")}
                                   min="1" placeholder="Номер зала"/>
                        <FormInput required type="number" {...register("numberOfSitsUpdate")}
                                   min="1" placeholder="Количество мест"/>
                        <FormInput required type="text" {...register("descriptionUpdate")} placeholder="Описание"/>
                        <Button>Изменить</Button>
                    </Form>
                </ModalContainer>
                <ModalContainer style={{display: currentWindow !== "delete" && "none"}}>
                    <Title>Удалить зал</Title>
                    <Form onSubmit={handleSubmit(deleteCinemaRoom)}>
                        <Button>Удалить</Button>
                    </Form>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default CinemaRooms