import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categories, categoryState, IForm, IToDo, toDoState } from '../atom';
import React from 'react';

function ToDo({ text, category, id }: IToDo) {
  const settoDos = useSetRecoilState(toDoState);
  const currentCategory = useRecoilValue(categoryState);
  {
    /*typescript에서 하나만 가져오고 싶을때
    IToDo['category'] <- 이런식으로 쓸 수 있다.    
    */
  }

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    settoDos((oldToDo) => {
      const targetIndex = oldToDo.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDo.slice(0, targetIndex),
        newToDo,
        ...oldToDo.slice(targetIndex + 1),
      ];
    });
  };

  {
    /* 해야할 것 
    1. 삭제버튼 만들기
    2. 카테고리 추가 인풋 만들기
     */
  }

  return (
    <>
      <li>
        {text}
        {category !== categories.TODO && (
          <button name={categories.TODO + ''} onClick={onClick}>
            TODO
          </button>
        )}
        {category !== categories.DOING && (
          <button name={categories.DOING + ''} onClick={onClick}>
            DOING
          </button>
        )}
        {category !== categories.DONE && (
          <button name={categories.DONE + ''} onClick={onClick}>
            DONE
          </button>
        )}
      </li>
    </>
  );
}
export default ToDo;
