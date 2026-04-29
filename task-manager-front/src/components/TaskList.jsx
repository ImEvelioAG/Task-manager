const TaskList = ({ tasks, onToggle, onEdit, onDelete }) => {
    if (tasks.length === 0) {
        return <p className="empty-msg">No hay tareas en esta categoría.</p>;
    }

    const formatDate = (date) => {
        if (!date) return null;
        return new Date(date).toLocaleString('es-MX');
    };

    const isAutoCompleted = (task) => {
        return task.status === 'completed' && task.scheduled_at;
    };

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div key={task.id} className={`task-card ${task.status}`}>
                    <div className="task-header">
                        <h4>
                            {isAutoCompleted(task) && (
                                <span className="auto-badge" title="Auto-completada"> </span>
                            )}
                            {task.title}
                        </h4>
                        <span className={`status-badge ${task.status}`}>
                            {task.status === 'pending' ? 'Pendiente' : 'Completada'}
                        </span>
                    </div>

                    {task.description && (
                        <p className="task-description">{task.description}</p>
                    )}

                    {task.scheduled_at && (
                        <p className="task-scheduled">
                             Programada: {formatDate(task.scheduled_at)}
                        </p>
                    )}

                    <div className="task-actions">
                        <button className="btn-toggle" onClick={() => onToggle(task)}>
                            {task.status === 'pending' ? '✓ Completar' : '↩ Reabrir'}
                        </button>
                        <button className="btn-edit" onClick={() => onEdit(task)}>
                             Editar
                        </button>
                        <button className="btn-delete" onClick={() => onDelete(task)}>
                             Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;