import styled from "styled-components";

const ModalWindow = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, .4);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.active ? 1 : 0};
  pointer-events: ${props => props.active ? "all" : "none"};
  transition: .5s;
  z-index: 100;
`

const ModalWindowContent = styled.div`
  width: fit-content;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  transform: ${props => props.active ? "scale(1)" : "scale(.5)"};
  transition: .4s all;
  z-index: 100;
`

const Modal = ({active, setActive, children}) => {
    return (
        <ModalWindow active={!!active} onClick={() => setActive(false)}>
            <ModalWindowContent active={!!active} onClick={e => e.stopPropagation()}>
                {children}
            </ModalWindowContent>
        </ModalWindow>
    )
}

export default Modal