import styled from "styled-components";
import {
    Cancel,
    CheckCircle,
    DateRangeOutlined,
    EventNoteOutlined,
    ForumOutlined,
    LocalMoviesOutlined,
    MovieFilterOutlined,
    MovieOutlined,
    Person,
    ReportGmailerrorredOutlined
} from "@mui/icons-material";
import {useLocalStorage, useSessionStorage} from "react-use";
import {useForm} from "react-hook-form";
import {getMethod, putMethod} from "../httpMethodsHandlers";
import {useEffect, useState} from "react";
import Modal from "../components/Modal";
import {useNavigate} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {month} from "../myLibrary";

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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5vw;
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

const Table = styled.table`
  width: 25vw;
`

const Caption = styled.caption`
  font-size: 2rem;
`

const Tr = styled.tr`
  font-size: 2rem;
  text-align: center;
`

const Th = styled.th``

const Td = styled.td``

const RepliesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 50vw;
  gap: 2vw;
  margin-bottom: 2vw;
`

const ReplyContainer = styled.div`
  position: relative;
  max-width: 30vw;
  display: flex;
  flex-direction: column;
  gap: 1vw;
  padding-top: 2vw;
  border-top: .1vw #cccccc solid;
`

const ReplyInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 1vw;
`

const ReplyInfoLeft = styled.div``

const ReplyIcon = styled(Person)``

const ReplyInfoRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: .25vw;
`

const ReplyUsername = styled.span`
  font-size: 1.5rem;
`

const ReplyDate = styled.span`
  font-size: 1rem;
  color: #a2a2a2;
`

const Reply = styled.span`
  font-size: 1.25rem;
  word-wrap: break-word;
`

const ReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
`

const Reports = styled.div`
  display: flex;
  justify-content: center;
  gap: 1vw;
  cursor: pointer;
`

const AdminPanel = () => {
    const [currentItem, setCurrentItem] = useSessionStorage("item", "Отзывы")
    const {register, handleSubmit} = useForm()
    const [profitByDate, setProfitByDate] = useState(null)
    const [top5ByDate, setTop5ByDate] = useState([])
    const [topByTypeMovie, setTopByTypeMovie] = useState(null)
    const [profitByMovie, setProfitByMovie] = useState({})
    const [allProfitByMovie, setAllProfitByMovie] = useState(null)
    const [replies, setReplies] = useState([])
    const [reportFile, setReportFile] = useState(null)
    const [modalActive, setModalActive] = useState(false)
    const [, setUser] = useLocalStorage("user")
    const navigate = useNavigate()
    const [type, setType] = useState("DOC")

    useEffect(() => {
        console.log(top5ByDate)
        console.log(profitByDate)
        console.log(topByTypeMovie)
        console.log(profitByMovie)
        console.log(allProfitByMovie)
        console.log(reportFile)
        console.log(replies)
    }, [allProfitByMovie, profitByDate, profitByMovie, replies, reportFile, top5ByDate, topByTypeMovie])

    const data = []

    for (let key in profitByMovie) {
        data.push({"Фильм": key, "Прибыль": profitByMovie[key]})
    }

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
                } else {
                    alert("Введите даты")
                }
            }

            currentItem === "Топ по типу фильма" &&
            setTopByTypeMovie("Комедия")
            // getMethod([{
            //         url: `http://localhost:8040/api/logic/topByTypeMovie`,
            //         set: setTopByTypeMovie
            //     }], {},
            //     [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])

            currentItem === "Прибыль по фильмам" &&
            getMethod([{
                    url: `http://localhost:8040/api/logic/getAllProfitByMovie`,
                    set: setAllProfitByMovie
                }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])

            currentItem === "Прибыль по фильму" &&
            getMethod([{
                    url: `http://localhost:8040/api/logic/profitByMovie`,
                    set: setProfitByMovie
                }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])

            currentItem === "Отчёт" &&
            getMethod([{
                    url: `http://localhost:8040/api/logic/getReportFile/${type}`,
                    set: setReportFile
                }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])

            currentItem === "Отзывы" &&
            getMethod([{
                    url: `http://localhost:8040/api/reply/findWaitingReplies`,
                    set: setReplies
                }], {},
                [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
        } catch (e) {
            alert(e)
        }
    }

    const handleCheck = (id, check) => {
        putMethod(`http://localhost:8040/api/reply/setStatusReply/${id}/${check}`, null, {},
            [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}])
            .then((navigate(0)))
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
                        {currentItem === "Прибыль по фильму" && Object.keys(profitByMovie).length !== 0 &&
                            <BarChart style={{display: data.length === 0 && "none"}} width={730} height={250}
                                      data={data}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="Фильм"/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="Прибыль" fill="#8884d8"/>
                            </BarChart>
                        }
                        {currentItem === "Топ по дате" && top5ByDate.length !== 0 &&
                            <Table>
                                <Caption>Топ фильмов по дате</Caption>
                                <thead>
                                <Tr>
                                    <Th>Номер</Th>
                                    <Th>Название</Th>
                                </Tr>
                                </thead>
                                <tbody>
                                {top5ByDate?.map((name, index) =>
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{name}</Td>
                                    </Tr>
                                )}
                                </tbody>
                            </Table>
                        }
                        {currentItem === "Прибыль по дате" && profitByDate &&
                            <Title>Текущая прибыль по дате: {profitByDate} рублей</Title>
                        }
                        {currentItem === "Топ по типу фильма" && topByTypeMovie &&
                            <Title>Самый популярный жанр: {topByTypeMovie}</Title>
                        }
                        {currentItem === "Прибыль по фильмам" && allProfitByMovie &&
                            <Title>Текущая прибыль по фильмам: {allProfitByMovie} рублей</Title>
                        }
                        {currentItem === "Отзывы" &&
                            <RepliesContainer>
                                {replies?.map((reply) => <ReplyContainer key={reply?.replyId}>
                                    <CheckCircle style={{cursor: "pointer", position: "absolute", right: "2vw"}}
                                                 color="success"
                                                 onClick={() => handleCheck(reply?.replyId, "CONFIRM")}/>
                                    <Cancel style={{cursor: "pointer", position: "absolute", right: 0}} color="error"
                                            onClick={() => handleCheck(reply?.replyId, "DELETED")}/>
                                    <ReplyInfo>
                                        <ReplyInfoLeft>
                                            <ReplyIcon fontSize="medium"/>
                                        </ReplyInfoLeft>
                                        <ReplyInfoRight>
                                            <ReplyUsername>{reply?.username}</ReplyUsername>
                                            <ReplyDate>
                                                {parseInt(reply?.createReply?.split("-")[2])} {month(parseInt(reply?.createReply?.split("-")[1]))}
                                            </ReplyDate>
                                        </ReplyInfoRight>
                                    </ReplyInfo>
                                    <Reply>{reply?.description}</Reply>
                                </ReplyContainer>)}
                            </RepliesContainer>
                        }
                        {currentItem === "Отчёт" &&
                           <ReportContainer>
                               <Title>Выберите формат отчёта</Title>
                               <Reports>
                                   <Title onClick={() => setType("DOC")}>DOC</Title>
                                   <Title onClick={() => setType("TXT")}>TXT</Title>
                               </Reports>
                           </ReportContainer>
                        }
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