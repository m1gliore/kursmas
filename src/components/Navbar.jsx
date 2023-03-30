import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {Person, Search} from '@mui/icons-material';
import logo from "../assets/images/logo.png"
import {useEffect, useState} from "react";
import Modal from "./Modal";

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

const SearchContainer = styled.div`
  border: .1vw solid lightgray;
  border-radius: .25vw;
  display: flex;
  align-items: center;
  padding: 5px;
`

const Input = styled.input`
  border: none;

  &:focus {
    outline: none;
  }
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
  cursor: pointer;

  &:hover {
    opacity: .67;
  }
`

const MenuItem = styled.div`
  font-size: 1.5rem;
`

const ModalContainer = styled.div`
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

    useEffect(() => {
        setAuthorized(true)
    }, [])

    return (
        <Wrapper>
            <Container>
                <Left>
                    <Link style={{textDecoration: "none"}} to={"/"}><Logo src={logo} alt="Лого"/></Link>
                </Left>
                <Center>
                    <SearchContainer>
                        <Input placeholder="Поиск"/>
                        <Search style={{color: "gray", fontSize: 16}}/>
                    </SearchContainer>
                </Center>
                <Right>
                    {authorized ? <><Person/>
                            <MenuItem onClick={() => navigate("/profile/mashina")}>Машина</MenuItem></> :
                        <MenuItem onClick={() => {
                            setModalActive(true)
                            setCurrentWindow("login")
                        }}>Войти</MenuItem>}
                </Right>
            </Container>
            <Modal active={modalActive} setActive={setModalActive}>
                <ModalContainer style={{display: currentWindow !== "login" && "none"}}>
                    <Title>Вход</Title>
                    <AuthorizationInput type="text" placeholder="Имя пользователя"/>
                    <AuthorizationInput type="password" placeholder="Пароль"/>
                    <Button>Войти</Button>
                    <Registration onClick={() => setCurrentWindow("logup")}>Нет аккаунта?
                        Зарегистрироваться</Registration>
                </ModalContainer>
                <ModalContainer style={{display: currentWindow !== "logup" && "none"}}>
                    <Title>Регистрация</Title>
                    <AuthorizationInput type="text" placeholder="Имя пользователя"/>
                    <AuthorizationInput type="password" placeholder="Пароль"/>
                    <AuthorizationInput type="password" placeholder="Повторите пароль"/>
                    <Button>Зарегистрироваться</Button>
                    <Registration onClick={() => setCurrentWindow("login")}>Есть аккаунт? Войти</Registration>
                </ModalContainer>
            </Modal>
        </Wrapper>
    )
}

export default Navbar