import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const { register } = useAuth();
    const navigate     = useNavigate();

    const [form, setForm]       = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [error, setError]     = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (form.password !== form.password_confirmation) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password, form.password_confirmation);
            navigate('/dashboard');
        } catch (err) {
            const errors = err.response?.data?.errors;
            if (errors) {
                setError(Object.values(errors).flat().join(' '));
            } else {
                setError(err.response?.data?.message || 'Error al registrarse.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Crear Cuenta</h2>
                {error && <div className="error-msg">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input type="password" name="password_confirmation" value={form.password_confirmation} onChange={handleChange} required />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>
                <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
        </div>
    );
};

export default Register;