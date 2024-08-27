import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

export type todolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Rest API", isDone: false},
    //     {id: v1(), title: "GraphQL", isDone: false},
    // ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });


    const removeTask = (todolistId: string, id: string) => {
        //1)заходим в state tasks;
        //2)делаем поверхностную копию
        //3)кладём её в такую же коробку как исходный state
        //4)берём ключ который пришёл в него вставляем данные которые взяли [todolistId]: tasks[todolistId]
        //5)берём массив дай мне все кроме той id что пришла
        setTasks((prevState) => ({...prevState, [todolistId]: prevState[todolistId].filter(el => el.id !== id)}))
    }

    function addTask(todolistId: string, title: string) {
        //создаём новую таску которую будем добавлять
        let newTask = {id: v1(), title: title, isDone: false};
        //делаем копию
        //берём ключ [todolistId]:
        //кладём в новый массив старые таски конкретные [...tasks[todolistId], новую таску newTask]
        setTasks(tasks => ({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}));
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        // Объяснение: Мы проходим по массиву задач конкретного тудулиста и проверяем,
        // совпадает ли id задачи с переданным taskId.
        // Если да, мы обновляем isDone, если нет — возвращаем задачу без изменений.
        setTasks(prevState => ({
            ...prevState,
            [todolistId]: prevState[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
        }));
    }

    // let tasksForTodolist = tasks так было раньше 15 строка
    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))
        // находим где и кого будем отрисовывать
        // Чтобы корректно обновить фильтр для конкретного тудулиста, необходимо выполнить следующие шаги:
        //     1)Использовать map для обхода всех тудулистов.
        //     2)Проверить, совпадает ли id текущего тудулиста с todolistId.
        //     3)Если совпадает, создать новый объект с обновленным значением фильтра.
        //     4)Если нет, просто вернуть текущий объект тудулиста.
    }

    return (
        <div className="App">
            {todolists.map((mapTodolist) => {
                let tasksForTodolist = tasks[mapTodolist.id]; //взяли из map
                if (mapTodolist.filter === "active") {
                    tasksForTodolist = tasks[mapTodolist.id].filter(t => t.isDone === false);
                }
                if (mapTodolist.filter === "completed") {
                    tasksForTodolist = tasks[mapTodolist.id].filter(t => t.isDone === true);
                }
                return (<Todolist
                        key={mapTodolist.id} //для реакта
                        todolistId={mapTodolist.id} //для нас
                        title={mapTodolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={mapTodolist.filter}
                    />
                );
            })}
        </div>
    );
}


export default App;
