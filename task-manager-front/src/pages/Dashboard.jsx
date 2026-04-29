import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const [tasks, setTasks]         = useState([]);
    const [filter, setFilter]       = useState('all');
    const [showForm, setShowForm]   = useState(false);
    const [editTask, setEditTask]   = useState(null);
    const [loading, setLoading]     = useState(true);
    const [error, setError]         = useState('');

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (err) {
            setError('Error al cargar las tareas.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
        // Polling cada 30 segundos para detectar auto-completados
        const interval = setInterval(fetchTasks, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleCreate = async (data) => {
        try {
            await api.post('/tasks', data);
            setShowForm(false);
            fetchTasks();
        } catch (err) {
            setError('Error al crear la tarea.');
        }
    };

    const handleUpdate = async (data) => {
        try {
            await api.put(`/tasks/${editTask.id}`, data);
            setEditTask(null);
            fetchTasks();
        } catch (err) {
            setError('Error al actualizar la tarea.');
        }
    };

    const handleToggle = async (task) => {
        try {
            await api.patch(`/tasks/${task.id}/toggle`);
            fetchTasks();
        } catch (err) {
            setError('Error al cambiar el estado.');
        }
    };

    const handleDelete = async (task) => {
        if (!window.confirm(`¿Eliminar la tarea "${task.title}"?`)) return;
        try {
            await api.delete(`/tasks/${task.id}`);
            fetchTasks();
        } catch (err) {
            setError('Error al eliminar la tarea.');
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (filter === 'pending')   return task.status === 'pending';
        if (filter === 'completed') return task.status === 'completed';
        return true;
    });

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1> Gestor de Tareas</h1>
                <div className="user-info">
                    <span>Hola, {user?.name}</span>
                    <button onClick={logout} className="btn-logout">Cerrar sesión</button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="dashboard-toolbar">
                    <button className="btn-primary" onClick={() => setShowForm(true)}>
                        + Nueva Tarea
                    </button>
                    <div className="filters">
                        <button className={filter === 'all'       ? 'active' : ''} onClick={() => setFilter('all')}>Todas</button>
                        <button className={filter === 'pending'   ? 'active' : ''} onClick={() => setFilter('pending')}>Pendientes</button>
                        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completadas</button>
                    </div>
                </div>

                {error   && <div className="error-msg">{error}</div>}
                {loading && <div className="loading">Cargando tareas...</div>}

                {!loading && (
                    <TaskList
                        tasks={filteredTasks}
                        onToggle={handleToggle}
                        onEdit={(task) => setEditTask(task)}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {showForm && (
                <TaskForm
                    onSubmit={handleCreate}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editTask && (
                <TaskForm
                    initialData={editTask}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditTask(null)}
                />
            )}
        </div>
    );
};

export default Dashboard;