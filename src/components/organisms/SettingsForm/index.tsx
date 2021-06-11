import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { InputField } from '../../atoms/InputField';
import { Button } from '../../atoms/Button';
import { Heading1 } from '../../atoms/Heading';
import { Icon } from '../../atoms/Icon';
import { saveCaptchaConfig } from '../../../redux/slices/captchaConfig/slice';
import { ICaptchaConfig } from '../../../types';

interface IProps {
  onClose: () => void;
  captchaConfig: ICaptchaConfig;
  width?: string;
  height?: string;
}

interface IFormData {
  host: string;
  siteKey: string;
}

const Container = styled.div<Pick<IProps, 'height' | 'width'>>`
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '400px'};
`;

const FormContainer = styled.div`
  padding: 0 2.5rem 2.5rem;
`;

const Header = styled.div`
  text-align: center;
  padding-bottom: 2.5rem;
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

export const SettingsForm: React.FC<IProps> = ({ onClose, captchaConfig }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm<IFormData>();
  const handleOnSubmit = (data: IFormData) => {
    dispatch(
      saveCaptchaConfig({
        host: data.host,
        siteKey: data.siteKey,
      }),
    );
    onClose();
  };
  return (
    <Container>
      <Header>
        <Heading1>Settings</Heading1>
      </Header>
      <FormContainer>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <InputField
            className={errors.host ? 'is-invalid' : ''}
            name="host"
            width="100%"
            margin="0 0 2.5rem 0"
            placeholder="Host"
            defaultValue={captchaConfig.host}
            inputRef={register({
              required: true,
              pattern: /^https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+$/,
            })}
          />
          <InputField
            className={errors.siteKey ? 'is-invalid' : ''}
            name="siteKey"
            width="100%"
            margin="0 0 2.5rem 0"
            placeholder="Sitekey"
            defaultValue={captchaConfig.siteKey}
            inputRef={register({
              required: true,
              pattern: /^[0-9a-zA-Z-_]+$/,
            })}
          />
          <ButtonWrapper>
            <Button width="100%">
              <Icon icon="save" fixedWidth margin="0 0.6rem 0 0" />
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </FormContainer>
    </Container>
  );
};
