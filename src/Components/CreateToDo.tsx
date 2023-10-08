import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IForm, toDoState } from "../atom";

function CreateToDo(){
    const settoDos = useSetRecoilState(toDoState) 
    {/* 값을 변경만 하는 함수 useSetRecoilState */}
    const currentCategory = useRecoilValue(categoryState)
    const {register,handleSubmit,setValue} = useForm<IForm>();
    const onCreateTodo = ({toDo}:IForm) => {
        settoDos(old => [{text:toDo, id:Date.now() ,category:currentCategory}, ...old])
    }
    setValue('toDo','')
    return(
        <>
        <form onSubmit={handleSubmit(onCreateTodo)}>
                <input {...register('toDo')} 
                placeholder="Write a to do"/>
                <button>Add</button>
            </form>
        </>
    )
}

export default CreateToDo;