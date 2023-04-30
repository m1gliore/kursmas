import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Person} from '@mui/icons-material';
import logo from "../assets/images/logo.png"
import {useEffect, useState} from "react";
import Modal from "./Modal";
import {useForm} from "react-hook-form";
import {getMethod, postMethod} from "../httpMethodsHandlers";
import {useLocalStorage} from "react-use";
import jwtDecode from "jwt-decode";
import {Autocomplete, Stack, TextField} from "@mui/material";

const Wrapper = styled.div``

const Container = styled.div`
  padding: .5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Center = styled.div`
  flex: 5;
  display: flex;
  justify-content: center;
`

const Logo = styled.img`
  width: 5vw;
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .5vw;
`

const MenuItem = styled.div`
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    opacity: .67;
  }
`

const ModalContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`

const Title = styled.h1`
  font-weight: 500;
  margin: 0;
`

const AuthorizationInput = styled.input`
  padding: .75rem;
  border: 1px solid gray;
  border-radius: .5vw;

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

const Registration = styled.span`
  cursor: pointer;
`

const Navbar = () => {

    const navigate = useNavigate()
    const [authorized, setAuthorized] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [currentWindow, setCurrentWindow] = useState(null)
    const {register, handleSubmit} = useForm()
    const [user, setUser] = useLocalStorage("user")
    const [username, setUsername] = useState("User")
    const [searchValue, setSearchValue] = useState(null)
    const [searchItems, setSearchItems] = useState([])

    useEffect(() => {
        if (user) {
            setAuthorized(true)
            setUsername(jwtDecode(user?.token).sub)
        }
        if (searchValue) {
            getMethod([{
                    url: `http://localhost:8040/api/movies/searchMoviesByText/${searchValue}`,
                    set: setSearchItems
                }], {}, [{code: 403, message: "Неверный запрос"}, {code: 415, message: "Что-то пошло не так"}]
            )
        }
    }, [searchValue, user])

    const submitRegister = (data) => {
        const formData = new FormData()
        const username = data.usernameReg
        const password = data.passwordReg
        const rPassword = data.rPassword

        if (password === rPassword) {
            formData.append("username", username)
            formData.append("password", password)
            postMethod(`http://localhost:8040/api/users/registrationNewUser`, formData,
                {}, [{code: 403, message: "Данные введены неверно"},
                    {code: 415, message: "Что-то пошло не так"}, {
                        code: 409,
                        message: "Такой пользователь уже зарегистрирован"
                    }],
                [setUser], false).then(() => navigate(0))
        } else {
            alert("Пароли не совпадают")
        }
    }

    const submitAuth = (data) => {
        const formData = new FormData()
        const username = data.usernameAuth
        const password = data.passwordAuth

        formData.append("username", username)
        formData.append("password", password)
        postMethod(`http://localhost:8040/api/users/authorization`, formData,
            {}, [{code: 403, message: "Данные введены неверно"},
                {code: 415, message: "Что-то пошло не так"}], [setUser], false)
            .then(() => setTimeout(() => {
                navigate(0)
            }, 500))
    }

    return (
        <Wrapper>
            <Container>
                <Left>
                    <Link style={{textDecoration: "none"}} to={"/"}><Logo src={logo} alt="Лого"/></Link>
                </Left>
                <Center>
                    <Stack spacing={2} sx={{width: 300}}>
                        <Autocomplete
                            id="free-solo-demo"
                            freeSolo
                            options={searchItems?.map((option) => option.nameMovie)}
                            renderInput={(params) => <TextField {...params} label="Поиск"/>}
                            onInput={(event) => setSearchValue(event.target.value.trim())}
                            onChange={(event) => {
                                const selected = searchItems?.find((option) => option.nameMovie === event.target.innerText)
                                navigate(`/movies/${selected?.movieId + "-" + selected?.latinName}`)
                                navigate(0)
                            }}
                        />
                    </Stack>
                </Center>
                <Right>
                    {authorized
                        ? <><Person/><MenuItem
                            onClick={() => navigate(`/user/profile/${username}`)}>{username}</MenuItem></>
                        : <><MenuItem onClick={() => {
                            setCurrentWindow("logup")
                            setModalActive(true)
                        }}
                        >Зарегистрироваться</MenuItem>
                            <MenuItem onClick={() => {
                                setCurrentWindow("login")
                                setModalActive(true)
                            }}
                            >Войти</MenuItem></>}
                </Right>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer style={{display: currentWindow !== "login" && "none"}}
                                onSubmit={handleSubmit(submitAuth)}>
                    <Title>Вход</Title>
                    <AuthorizationInput required type="text" {...register("usernameAuth")}
                                        placeholder="Имя пользователя"/>
                    <AuthorizationInput required type="password" {...register("passwordAuth")} placeholder="Пароль"/>
                    <Button type="submit">Войти</Button>
                    <Registration onClick={() => setCurrentWindow("logup")}>Нет аккаунта?
                        Зарегистрироваться</Registration>
                </ModalContainer>
                <ModalContainer style={{display: currentWindow !== "logup" && "none"}}
                                onSubmit={handleSubmit(submitRegister)}>
                    <Title>Регистрация</Title>
                    <AuthorizationInput required type="text" {...register("usernameReg")}
                                        placeholder="Имя пользователя"/>
                    <AuthorizationInput required type="password" {...register("passwordReg")} placeholder="Пароль"/>
                    <AuthorizationInput required type="password" {...register("rPassword")}
                                        placeholder="Повторите пароль"/>
                    <Button type="submit">Зарегистрироваться</Button>
                    <Registration onClick={() => setCurrentWindow("login")}>Есть аккаунт? Войти</Registration>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Navbar