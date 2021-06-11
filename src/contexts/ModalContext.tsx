import React, {
  ReactNode,
  useCallback,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Modal } from '../components/molecules/Modal';

export interface IModalContext {
  isModalShown: boolean;
  setModalShown: Dispatch<SetStateAction<boolean>>;
  modalContent: ReactNode;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
  openModal: (node: ReactNode) => void;
  closeModal: () => void;
}

export const ModalContext = createContext({} as IModalContext);

const useProvideModal = (): IModalContext => {
  const [isModalShown, setModalShown] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const openModal = useCallback((content: ReactNode) => {
    setModalContent(content);
    setModalShown(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
    setModalShown(false);
  }, []);

  return {
    isModalShown,
    setModalShown,
    modalContent,
    setModalContent,
    openModal,
    closeModal,
  };
};

export const ModalProvider: React.FC = ({ children }) => {
  const {
    isModalShown,
    setModalShown,
    modalContent,
    setModalContent,
    openModal,
    closeModal,
  } = useProvideModal();

  return (
    <ModalContext.Provider
      value={{
        isModalShown,
        setModalShown,
        modalContent,
        setModalContent,
        openModal,
        closeModal,
      }}
    >
      {isModalShown && <Modal content={modalContent} onClose={closeModal} />}
      {children}
    </ModalContext.Provider>
  );
};
