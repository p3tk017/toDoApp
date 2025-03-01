import styles from './TaskItem.module.css';

export default function TaskItem({
    id,
    text,
    isCompleted,
    onStatusChange,
    onDelete
}) {

    const taskClass = [styles['button']];
    if (isCompleted) {
        taskClass.push(styles['isCompleted']);
    }

    function deleteTask() {}

    return (
        <li>
            <span>{text}</span> 
            <div className='btnContainer'>
                <button onClick={() => onStatusChange(id)} className={taskClass.join(' ')}>{isCompleted ? 'Complete' : 'Incomplete'}</button>
                <button onClick={() => onDelete(id)} className="delete">X</button>
            </div>
        </li>
    )
}    