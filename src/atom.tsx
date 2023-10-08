import { atom , selector} from "recoil";
import { recoilPersist } from "recoil-persist";

export enum categories {
    'TODO' = 'TODO',
    'DOING' = 'DOING',
    'DONE' = 'DONE',
}

export interface IForm {
    toDo: string;
    to:string;
}


export interface IToDo{
    text:string;
    id:number;
    category:categories;
}

export interface ICategory{
    text:string;
    id:number;
}

export const categoryState = atom<categories>({
    key:'category',
    default:categories.TODO,
})

const {persistAtom} = recoilPersist({
    key:'todoLocal',
    storage:localStorage,
})

export const toDoState = atom<IToDo[]>({
    key:'toDo',
    default:[],
    effects_UNSTABLE:[persistAtom],
})

export const toDoSelector = selector({
    key:'toDoSelector',
    get: ({get}) => {
        const toDos = get(toDoState)
        const category = get(categoryState)
        return toDos.filter((toDo) => toDo.category === category)
    }
})

