import styled from "styled-components";
import {Instagram, Telegram} from "@mui/icons-material";
import { Icon32LogoVkColor } from '@vkontakte/icons';
import payments from "../assets/images/payments.png"

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const Top = styled.div`
  flex: 1;
  width: calc(100% - 2.5rem);
  display: flex;
  justify-content: flex-start;
  padding: 1.25rem;
`

const SocialContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1vw;
`

const SocialIcon = styled.div`
  width: 2vw;
  height: 2vw;
  border-radius: 3vw;
  color: white;
  background-color: #${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Bottom = styled.div`
  flex: 1;
  width: calc(100% - 2.5rem);
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 300;
  margin: 0;
`

const Payments = styled.img`
  width: 25%;
`

const Footer = () => {
    return (
        <Container>
            <Top>
                <SocialContainer>
                    <a href="https://web.telegram.org/" target="_blank" rel="noreferrer">
                        <SocialIcon color="2da5e1">
                            <Telegram/>
                        </SocialIcon>
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                        <SocialIcon color="e4405f">
                            <Instagram/>
                        </SocialIcon>
                    </a>
                    <a href="https://vk.com/" target="_blank" rel="noreferrer">
                        <SocialIcon color="0077ff">
                            <Icon32LogoVkColor/>
                        </SocialIcon>
                    </a>
                </SocialContainer>
            </Top>
            <Bottom>
                <Title>© ООО «Кинотеатр Маши» 2023. Все права защищены.</Title>
                <Payments src={payments} alt="Способы оплаты"/>
            </Bottom>
        </Container>
    )
}

export default Footer