import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categories, categoryState, toDoSelector, toDoState } from '../atom';
import Category from './Category';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';

function Todolist() {
  const toDos = useRecoilValue(toDoSelector);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <Category />
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
      <hr />
    </div>
  );
}

export default Todolist;
