import { QRL, component$ } from '@builder.io/qwik';
import { Task } from '~/routes/tasks';

interface Props {
    tasks: Task[];
    toggle: QRL<(task: Task) => void>;
}

export default component$((props: Props) => {
    const { tasks, toggle } = props;

    return (<ul>
        {tasks.map(t => (<li key={t.id}><input type="checkbox" onChange$={() => toggle(t)} /><span class={`${t.isDone ? 'done' : ''}`}>{t.title}</span></li>))}
    </ul>)
})