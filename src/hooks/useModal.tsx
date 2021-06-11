import { useContext } from 'react';
import { ModalContext, IModalContext } from '../contexts/ModalContext';

export const useModal = (): IModalContext => {
  return useContext(ModalContext);
};
