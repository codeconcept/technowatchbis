import { $, QwikKeyboardEvent, Signal, component$, useSignal, useTask$ } from '@builder.io/qwik';
import TaskList from '~/components/TaskList';

export interface Task {
    id: number;
    title: string;
    isDone: boolean;
}

export default component$(() => {
    const tasksSignal: Signal<Task[]> = useSignal([]);
    const titleSignal = useSignal('');
    const nbTasksSignal = useSignal(0);
    const messageSignal = useSignal('');

    const toggle = $((task: Task) => {
        task.isDone = !task.isDone;
        tasksSignal.value = tasksSignal.value.map(t => t.id !== task.id ? t : { ...task });
    });

    const addTask = $(() => {
        console.log('addTask');
        tasksSignal.value = [...tasksSignal.value, { id: Date.now(), title: titleSignal.value, isDone: false }];
        titleSignal.value = '';
    });

    useTask$(({ track }) => {
        track(() => tasksSignal.value);
        nbTasksSignal.value = tasksSignal.value.length;
        messageSignal.value = nbTasksSignal.value < 2 ?
            `${nbTasksSignal.value} tâche`
            : `${nbTasksSignal.value} tâches`;
    });

    const handleEnter = $((e: QwikKeyboardEvent<HTMLInputElement>) => {
        console.log(e.key);
        if (e.key.toLowerCase() === 'enter') {
            addTask();
        }
    });

    return (
        <div class="container">
            <h3>{messageSignal.value}</h3>
            <div>
                <input type="text" bind:value={titleSignal} autoFocus onKeyUp$={handleEnter} />
                <button onClick$={addTask}>nouvelle tâche</button>
            </div>
            <div>
                <TaskList tasks={tasksSignal.value} toggle={toggle} />
            </div>
            <div>
                {JSON.stringify(tasksSignal.value, null, 2)}
            </div>
        </div>
    )
})