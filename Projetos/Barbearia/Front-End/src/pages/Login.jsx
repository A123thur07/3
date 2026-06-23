import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginScreen() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function Login(e) {
        e.preventDefault()

        setLoading(true)
        setError('')

        try {
            // URL do seu Swagger/API
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    senha: password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Erro ao fazer login')
            }

            // Salva token
            localStorage.setItem('token', data.token)

            alert('Login realizado com sucesso!')
            navigate('/Principal') // Redireciona para a página principal
            console.log(data)
        } catch (erro) {
            setError(erro.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 flex items-center justify-center p-6 overflow-hidden relative">
            {/* Background Shapes */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/4" />

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl border border-black/10 shadow-2xl rounded-[32px] p-10">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-black tracking-tight">
                        Bem-vindo
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Faça login para continuar
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={Login}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            E-mail
                        </label>
                        <input
                            type="email"
                            placeholder="seuemail@gmail.com"
                            className="w-full px-4 py-4 rounded-2xl border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-black transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-4 rounded-2xl border border-gray-300 bg-white text-black outline-none focus:ring-2 focus:ring-black transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-3 rounded-xl">
                            {error}
                        </div>
                    )}



                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-2xl bg-black text-white font-semibold text-lg hover:scale-[1.01] active:scale-[0.99] transition-all shadow-lg disabled:opacity-50"
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
