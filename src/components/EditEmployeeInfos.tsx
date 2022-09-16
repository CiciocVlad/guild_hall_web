import { Box } from '@mui/material';
import { ComponentWithTextArea } from './ComponentWithTextArea';
import { DisplayString } from './DisplayString';
import { NameInputsContainer } from './NameInputsContainer';
import { TextInputSectionWithBtn } from './TextInputSectionWithBtn';

export const EditEmployeeInfos = ({
  name,
  setName,
  prefferedName,
  setPrefferedName,
  bio,
  setBio,
  phone,
  setPhone,
  email,
  setEmail,
  hobbies,
  startDate,
  setStartDate,
  disabled,
  setDisabled,
}: {
  name: string | null;
  setName: (value: string | null) => void;
  prefferedName: string | null;
  setPrefferedName: (value: string | null) => void;
  bio: string | null;
  setBio: (value: string | null) => void;
  phone: string | null;
  setPhone: (value: string | null) => void;
  email: string | null;
  setEmail: (value: string | null) => void;
  hobbies: string | null;
  startDate: string | null;
  setStartDate: (value: string | null) => void;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
}) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <NameInputsContainer
      title="Name"
      firstFieldLabel="First and last name"
      firstField={name}
      setFirstField={setName}
      secondFieldLabel="Preferred name"
      secondField={prefferedName}
      setSecondField={setPrefferedName}
      setDisabled={setDisabled}
    />
    <ComponentWithTextArea
      title="Description"
      placeholder="Your description here"
      description={bio}
      setDescription={setBio}
    />
    <NameInputsContainer
      title="Contact"
      firstFieldLabel="Phone number"
      firstField={phone}
      setFirstField={setPhone}
      secondFieldLabel="Email address"
      secondField={email}
      setSecondField={setEmail}
      setDisabled={setDisabled}
    />
    <DisplayString title="Hobbies" value={hobbies?.replace(',', ', ')} />
    <TextInputSectionWithBtn
      title="Date of starting work"
      label="Joined forces in"
      field={startDate}
      setField={setStartDate}
      disabled={disabled}
    />
  </Box>
);
