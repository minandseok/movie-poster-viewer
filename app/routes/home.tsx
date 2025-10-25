import {use, useState} from 'react';

export function meta() {
  return [
    {title: 'movie poster viewer'},
    {name: 'description', content: 'View movie posters'},
    {name: 'keywords', content: 'movie, poster, viewer'},
  ];
}

export default function Home() {
  const [input, setInput] = useState('');
  const [toDoList, setToDoList] = useState<string[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim() === '') return;
    setToDoList((toDoList) => [...toDoList, input.trim()]);
    setInput('');
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleDelete = (index: number) => {
    setToDoList((toDoList) => toDoList.filter((_, i) => i !== index));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={input}
          onChange={handleInput}
          placeholder='할 일 적으셈'
        />
        <button>Add</button>
      </form>
      <ul>
        {toDoList.map((toDo, index) => (
          <li key={index}>
            <span>
              {index + 1}. {toDo}
            </span>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
