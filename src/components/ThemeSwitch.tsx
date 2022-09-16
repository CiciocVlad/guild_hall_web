import clsx from 'clsx';
import { useSwitch, UseSwitchProps } from '@mui/core/SwitchUnstyled';
import { styled } from '@mui/system';

const SwitchRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 56px;
  height: 28px;
  padding: 7px;
`;

const SwitchInput = styled('input')`
  position: absolute;
  width: 3.5rem;
  height: 1.75rem;
  top: 0.375rem;
  left: 0.38rem;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled('span')(
  ({ theme }) => `
  position: absolute;
  display: block;
  background-color: ${theme.palette.mode === 'dark' ? '#2C2C2C' : '#FCE407'};
  background-image: ${
    theme.palette.mode === 'dark'
      ? `url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2463 1.21268C13.524 2.16526 13.6683 3.15173 13.675 4.14393C13.5774 6.70091 12.5962 9.14494 10.8986 11.0596C9.20093 12.9742 6.89195 14.2409 4.36504 14.6439C3.49381 14.7589 2.61126 14.7589 1.74004 14.6439C1.58098 14.6416 1.42429 14.6826 1.28681 14.7626C1.14933 14.8426 1.03626 14.9586 0.959777 15.0981C0.88329 15.2376 0.846273 15.3953 0.852706 15.5542C0.859138 15.7132 0.908776 15.8673 0.996284 16.0002C1.98729 17.1268 3.20825 18.0279 4.57689 18.6429C5.94554 19.2578 7.43009 19.5723 8.93052 19.5651C10.431 19.5579 11.9124 19.2292 13.2751 18.6012C14.6378 17.9732 15.8501 17.0604 16.8302 15.9243C17.8104 14.7883 18.5357 13.4553 18.9573 12.0153C19.3788 10.5753 19.4869 9.06167 19.2741 7.57638C19.0614 6.09109 18.5328 4.66865 17.7239 3.40489C16.915 2.14113 15.8447 1.0654 14.585 0.250181C14.4365 0.147307 14.2598 0.0929302 14.0791 0.0945161C13.8985 0.0961021 13.7227 0.153573 13.576 0.259038C13.4293 0.364503 13.3189 0.51279 13.2599 0.68354C13.2008 0.85429 13.1961 1.03913 13.2463 1.21268Z" fill="yellow"/></svg>')`
      : ''
  } ;
  width: 1.3125rem;
  height: 1.3125rem;
  border-radius: 1rem;
  top: 0.25rem;
  background-position: right -1px bottom -1px;
  background-repeat: no-repeat;

  left: 3.98px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;

  &.focusVisible {
    background-color: #79B;
  }

  &.checked {
    transform: translateX(27px);
    
    &:before {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>');
    }
  }
`
);

const SwitchTrack = styled('span')(
  ({ theme }) => `
  background-color: ${theme.palette.mode === 'dark' ? '#626262' : '#6698FF'};
  border-radius: 3.125rem;
  width: 3.5rem;
  height: 1.75rem;
  display: block;
  position: relative;
  
  &:before {
    position: absolute;
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-image: ${
      theme.palette.mode === 'dark'
        ? `url('data:image/svg+xml;utf8,<svg width="14" height="13" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.04327 8.824C6.17038 8.74728 6.32954 8.74728 6.45665 8.824L9.04336 10.3852C9.34629 10.5681 9.71998 10.2965 9.63959 9.9519L8.95314 7.00937C8.91941 6.86477 8.96855 6.71338 9.08078 6.61616L11.3681 4.63464C11.6354 4.40313 11.4928 3.96417 11.1406 3.93379L8.12892 3.67409C7.98138 3.66137 7.85295 3.56818 7.79508 3.43186L6.61816 0.659186C6.48023 0.334241 6.01969 0.334241 5.88176 0.659186L4.70483 3.43186C4.64697 3.56818 4.51854 3.66137 4.371 3.67409L1.35816 3.93389C1.00607 3.96425 0.863442 4.40287 1.13034 4.63451L3.41392 6.6164C3.52581 6.71351 3.57486 6.86451 3.5414 7.00884L2.85868 9.95335C2.77882 10.2978 3.15233 10.5689 3.45503 10.3862L6.04327 8.824Z" fill="yellow"/></svg>')`
        : `url('data:image/svg+xml;utf8,<svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.2875 4.47565C10.8908 2.46899 9.12333 0.958153 7 0.958153C5.31417 0.958153 3.85 1.91482 3.12083 3.30899C1.365 3.50149 0 4.98315 0 6.79149C0 7.71974 0.368749 8.60998 1.02513 9.26636C1.6815 9.92274 2.57174 10.2915 3.5 10.2915H11.0833C11.4664 10.2915 11.8456 10.216 12.1995 10.0695C12.5534 9.92289 12.8749 9.70805 13.1457 9.43721C13.4166 9.16638 13.6314 8.84485 13.778 8.49098C13.9246 8.13711 14 7.75784 14 7.37482C14 5.83482 12.8042 4.58649 11.2875 4.47565Z" fill="white"/></svg>')`
    } ;
    left:${theme.palette.mode === 'dark' ? '0.1875px' : '1.8125rem'};
    top: 0.625rem;
    border-radius: 0rem;
    background-repeat: no-repeat;
  }

  &:after {
    content: '';
    position: absolute;
    width: 12.5rem;
    height: 12.5rem;
    background-image: ${
      theme.palette.mode === 'dark'
        ? `url('data:image/svg+xml;utf8,<svg width="8.2" height="8.2" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.39655 5.73381C3.46011 5.69545 3.53969 5.69545 3.60325 5.73381L5.34722 6.78641C5.49869 6.87782 5.68553 6.74203 5.64534 6.56974L5.18253 4.58587C5.16567 4.51357 5.19024 4.43788 5.24635 4.38927L6.78814 3.05361C6.92176 2.93786 6.8505 2.71837 6.67437 2.70319L4.64428 2.52813C4.57051 2.52177 4.50629 2.47517 4.47736 2.40701L3.684 0.537967C3.61503 0.375495 3.38476 0.375495 3.3158 0.537967L2.52244 2.40701C2.49351 2.47517 2.42929 2.52177 2.35552 2.52813L0.324831 2.70324C0.148785 2.71842 0.0774731 2.93773 0.210922 3.05354L1.75011 4.38939C1.80605 4.43794 1.83058 4.51344 1.81385 4.58561L1.35363 6.57046C1.3137 6.74268 1.50046 6.87822 1.65181 6.78687L3.39655 5.73381Z" fill="yellow"/></svg>')`
        : `url('data:image/svg+xml;utf8,<svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.30469 3.03156C7.05677 1.77739 5.95208 0.833122 4.625 0.833122C3.57135 0.833122 2.65625 1.43104 2.20052 2.30239C1.10312 2.42271 0.25 3.34875 0.25 4.47896C0.25 5.05912 0.480468 5.61552 0.890704 6.02575C1.30094 6.43599 1.85734 6.66646 2.4375 6.66646H7.17708C7.41647 6.66646 7.65352 6.61931 7.87468 6.5277C8.09585 6.43609 8.29681 6.30181 8.46608 6.13254C8.63535 5.96326 8.76963 5.76231 8.86124 5.54114C8.95285 5.31997 9 5.08293 9 4.84354C9 3.88104 8.2526 3.10083 7.30469 3.03156Z" fill="white"/></svg>')`
    };
    background-repeat: no-repeat;
    left: ${theme.palette.mode === 'dark' ? '1.25rem' : '2.5rem'};
    top: ${theme.palette.mode === 'dark' ? '0.375rem' : '0.218rem'};
  }
`
);

export const ThemeSwitch = (props: UseSwitchProps) => {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <SwitchRoot className={clsx(stateClasses)}>
      <SwitchTrack>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} aria-label="Demo switch" />
    </SwitchRoot>
  );
};
