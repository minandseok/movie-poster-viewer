import {useState} from 'react';

export function meta() {
  return [
    {title: 'movie poster viewer'},
    {name: 'description', content: 'View movie posters'},
    {name: 'keywords', content: 'movie, poster, viewer'},
  ];
}

export default function Home() {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target;
    const numberValue = Number(value);

    if (id === 'hour') {
      setHour(numberValue);
      setMinute(numberValue * 60);
    } else if (id === 'minute') {
      setMinute(numberValue);
      setHour(Math.floor(numberValue / 60));
    }
  };

  const handleFlip = () => {
    setDisabled((disabled) => !disabled);
  };

  return (
    <div>
      <label htmlFor='hour'>Hour: </label>
      <input
        type='number'
        id='hour'
        value={hour}
        onChange={handleChange}
        disabled={disabled}
      />
      <br />
      <label htmlFor='minute'>Minute: </label>
      <input
        type='number'
        id='minute'
        value={minute}
        onChange={handleChange}
        disabled={disabled === false}
      />
      <br />
      <button onClick={handleFlip}>Flip</button>
    </div>
  );
}
