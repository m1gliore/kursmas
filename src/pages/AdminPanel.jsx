import styled from "styled-components";
import {
    DateRangeOutlined,
    EventNoteOutlined,
    ForumOutlined, LocalMoviesOutlined,
    MovieFilterOutlined,
    MovieOutlined,
    ReportGmailerrorredOutlined
} from "@mui/icons-material";
import {useLocalStorage, useSessionStorage} from "react-use";
import {useForm} from "react-hook-form";
import {getMethod} from "../httpMethodsHandlers";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import {useNavigate} from "react-router-dom";

const Wrapper = styled.div`
  margin: 1vw 5vw;
  padding: 1vw;
  width: 90vw;
  max-height: fit-content;
  min-height: 64vh;
  background-color: #ececec;
  border-radius: .5vw;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: .5vw;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: .5vw;
  border-radius: .5vw;
  padding: .25vw;
  cursor: pointer;
  transition: .5ms ease-in-out;

  &:hover {
    background-color: #dcdcdc;
  }
`

const MenuText = styled.span`
  font-size: 1rem;
`

const Bottom = styled.div`
  display: flex;
  gap: .5vw;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5vw;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`

const FormText = styled.span`
  font-size: 1.25rem;
`

const Input = styled.input`
  outline: none;
  padding: .25vw;
  border: .1vw solid black;
  border-radius: .25vw;
  cursor: pointer;
  transition: .5ms ease-in-out;

  &:hover {
    background-color: #dcdcdc;
  }

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  padding: .25vw;
  border: .1vw solid black;
  border-radius: .25vw;
  cursor: pointer;
  transition: .5ms ease-in-out;

  &:hover {
    background-color: #dcdcdc;
  }
`

const Right = styled.div`
  flex: 5;
`

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

const ButtonDel = styled.button`
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

const AdminPanel = () => {
    const [currentItem, setCurrentItem] = useSessionStorage("item", "Отзывы")
    const {register, handleSubmit} = useForm()
    const [profitByDate, setProfitByDate] = useState(null)
    const [top5ByDate, setTop5ByDate] = useState([])
    const [topByTypeMovie, setTopByTypeMovie] = useState([])
    const [profitByMovie, setProfitByMovie] = useState({})
    const [allProfitByMovie, setAllProfitByMovie] = useState({})
    const [reportFile, setReportFile] = useState(null)
    const [modalActive, setModalActive] = useState(false)
    const [, setUser] = useLocalStorage("user")
    const navigate = useNavigate()

    useEffect(() => {
        console.log(top5ByDate)
        console.log(profitByDate)
        console.log(topByTypeMovie)
        console.log(profitByMovie)
        console.log(allProfitByMovie)
        console.log(reportFile)
    }, [allProfitByMovie, profitByDate, profitByMovie, reportFile, top5ByDate, topByTypeMovie])

    const submitDate = (data) => {
        try {
            if (currentItem === "Топ по дате") {
                if (data.start && data.end) {
                    getMethod([{
                        url: `http://localhost:8040/api/logic/top5ByDate`,
                        set: setTop5ByDate
                    }], {
                        params: {
                            "start": data.start,
                            "end": data.end
                        }
                    }, [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
                        .then(() => console.log(top5ByDate))
                } else {
                    alert("Введите даты")
                }
            }

            if (currentItem === "Прибыль по дате") {
                if (data.start && data.end) {
                    getMethod([{
                        url: `http://localhost:8040/api/logic/profitByDate`,
                        set: setProfitByDate
                    }], {
                        params: {
                            "start": data.start,
                            "end": data.end
                        }
                    }, [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
                        .then(() => console.log(profitByDate))
                } else {
                    alert("Введите даты")
                }
            }

            currentItem === "Топ по типу фильма" &&
            getMethod([{
                    url: `http://localhost:8040/api/logic/topByTypeMovie`,
                    set: setTopByTypeMovie
                }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
                .then(() => console.log(topByTypeMovie))

            currentItem === "Прибыль по фильмам" &&
            getMethod([{
                    url: `http://localhost:8040/api/logic/getAllProfitByMovie`,
                    set: setAllProfitByMovie
                }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
                .then(() => console.log(allProfitByMovie))

            currentItem === "Прибыль по фильму" &&
            getMethod([{
                    url: `http://localhost:8040/api/logic/profitByMovie`,
                    set: setProfitByMovie
                }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
                .then(() => console.log(profitByMovie))

            currentItem === "Отчёт" &&
            getMethod([{
                url: `http://localhost:8040/api/logic/getReportFile/DOC`,
                set: setReportFile
            }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
                .then(() => console.log(reportFile))
        } catch (e) {
            alert(e)
        }
    }

    return (
        <Wrapper>
            <Container>
                <Top>
                    <MenuItem onClick={() => setCurrentItem("Топ по дате")}>
                        <EventNoteOutlined/>
                        <MenuText>Топ по дате</MenuText>
                    </MenuItem>
                    <MenuItem onClick={() => setCurrentItem("Прибыль по дате")}>
                        <DateRangeOutlined/>
                        <MenuText>Прибыль по дате</MenuText>
                    </MenuItem>
                    <MenuItem onClick={() => setCurrentItem("Топ по типу фильма")}>
                        <MovieOutlined/>
                        <MenuText>Топ по типу фильма</MenuText>
                    </MenuItem>
                    <MenuItem onClick={() => setCurrentItem("Прибыль по фильмам")}>
                        <LocalMoviesOutlined/>
                        <MenuText>Прибыль по фильмам</MenuText>
                    </MenuItem>
                    <MenuItem onClick={() => setCurrentItem("Прибыль по фильму")}>
                        <MovieFilterOutlined/>
                        <MenuText>Прибыль по фильму</MenuText>
                    </MenuItem>
                    <MenuItem onClick={() => setCurrentItem("Отчёт")}>
                        <ReportGmailerrorredOutlined/>
                        <MenuText>Отчёт</MenuText>
                    </MenuItem>
                    <MenuItem onClick={() => setCurrentItem("Отзывы")}>
                        <ForumOutlined/>
                        <MenuText>Отзывы</MenuText>
                    </MenuItem>
                </Top>
                <Bottom>
                    <Left>
                        <Form onSubmit={handleSubmit(submitDate)}>
                            <FormText>От</FormText>
                            <Input type="date" {...register("start")}/>
                            <FormText>До</FormText>
                            <Input type="date" {...register("end")}/>
                            <Input type="submit" value="Рассчитать"/>
                        </Form>
                        <Button onClick={() => setModalActive(true)}>Выйти</Button>
                    </Left>
                    <Right>
                        <Title>{currentItem}</Title>
                    </Right>
                </Bottom>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer>
                    <Title>Вы действительно хотите выйти со своего аккаунта?</Title>
                    <ButtonDel onClick={() => {
                        setUser("")
                        navigate("/")
                        navigate(0)
                    }}>Выйти</ButtonDel>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default AdminPanel