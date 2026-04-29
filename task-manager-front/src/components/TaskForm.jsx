import { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, onCancel, initialData }) => {
    const [form, setForm] = useState({
        title: '',
        description: '',
        scheduled_at: '',
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title:        initialData.title || '',
                description:  initialData.description || '',
                scheduled_at: initialData.scheduled_at
                    ? new Date(initialData.scheduled_at).toISOString().slice(0, 16)
                    : '',
            });
        }
    }, [initialData]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...form,
            scheduled_at: form.scheduled_at || null,
        });
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>{initialData ? 'Editar Tarea' : 'Nueva Tarea'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Título *</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label>Fecha programada (opcional)</label>
                        <input
                            type="datetime-local"
                            name="scheduled_at"
                            value={form.scheduled_at}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn-primary">
                            {initialData ? 'Guardar cambios' : 'Crear tarea'}
                        </button>
                        <button type="button" className="btn-secondary" onClick={onCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;