import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { BaseApi } from '@/shared/infrastructure/base-api.js'

// Instancia de la API para hacer las llamadas
const api = new BaseApi()

export const useUserStore = defineStore('user', () => {
    // --- STATE ---
    const user = ref({
        id: 0,
        username: '',
        email: '',
        role: '', // 'passenger' o 'company'
        token: '',
        isAuthenticated: false
    })

    // --- GETTERS ---
    const isLoggedIn = computed(() => user.value.isAuthenticated)
    const isPassenger = computed(() => user.value.role === 'passenger')
    const isCompany = computed(() => user.value.role === 'company')

    const maskedEmail = computed(() => {
        if (!user.value.email) return '••••••••••'
        const [name, domain] = user.value.email.split('@')
        return `${name.slice(0, 2)}••••@${domain}`
    })

    const maskedPassword = computed(() => '••••••••••')

    // --- ACTIONS ---

    /**
     * Iniciar sesión (para Pasajeros y Empresas)
     * Conecta con: POST /api/v1/auth/sign-in
     */
    async function login(credentials) {
        try {
            console.log('🔄 Intentando login...', credentials)
            
            // Llamada al endpoint de autenticación
            const response = await api.http.post('/auth/sign-in', {
                username: credentials.username, // Tu backend espera 'username'
                password: credentials.password
            })

            const data = response.data

            // Actualizamos el estado con la respuesta real del backend
            user.value = {
                id: data.id,
                username: data.username,
                token: data.token,
                role: 'passenger', // Asumimos pasajero por defecto o lo sacamos del token
                isAuthenticated: true
            }

            // Guardar sesión en LocalStorage
            saveSessionToStorage()
            console.log('✅ Login exitoso:', user.value.username)
            return true

        } catch (error) {
            console.error('❌ Error en login:', error)
            throw new Error(error.response?.data?.message || 'Credenciales incorrectas')
        }
    }

    /**
     * Registro de Pasajero
     * Conecta con: POST /api/v1/auth/sign-up
     */
    async function register(userData) {
        try {
            console.log('Registrando usuario...', userData)

            await api.http.post('/auth/sign-up', {
                username: userData.username,
                password: userData.password
            })

            console.log('Usuario registrado. Ahora inicia sesión.')
            return true
        } catch (error) {
            console.error('Error en registro:', error)
            throw new Error(error.response?.data?.message || 'Error al registrar usuario')
        }
    }

    /**
     * Registro de Empresa
     * Conecta con: POST /api/v1/companies
     */
    async function registerCompany(companyData) {
        try {
            console.log('Registrando empresa...', companyData)

            // Ajusta los campos según lo que espere tu CreateCompanyResource.cs en el backend
            await api.http.post('/companies', {
                name: companyData.companyName,
                ruc: companyData.ruc,
                address: companyData.address,
                email: companyData.email,
                // Si tu endpoint de companies crea usuario a la vez, envía password
                // Si no, tendrás que ajustar esto.
                password: companyData.password 
            })

            console.log('Empresa registrada.')
            return true
        } catch (error) {
            console.error('Error registro empresa:', error)
            throw new Error(error.response?.data?.message || 'Error al registrar empresa')
        }
    }

    /**
     * Login específico para empresas (si fuera un endpoint distinto)
     * Si usan el mismo /auth/sign-in, puedes reutilizar la función 'login' de arriba.
     */
    async function loginCompany(email, password) {
        // Por ahora reutilizamos el login normal, ya que el Auth suele ser centralizado
        const success = await login({ username: email, password: password })
        if(success) {
            user.value.role = 'company' // Forzamos el rol en el estado local
            saveSessionToStorage()
            return user.value
        }
    }

    /**
     * Cerrar Sesión
     */
    function logout() {
        console.log('Cerrando sesión')
        user.value = {
            id: 0,
            username: '',
            email: '',
            role: '',
            token: '',
            isAuthenticated: false
        }
        localStorage.removeItem('bustrack_session')
    }

    // --- PERSISTENCIA ---

    function saveSessionToStorage() {
        localStorage.setItem('bustrack_session', JSON.stringify(user.value))
    }

    function loadUserFromStorage() {
        const saved = localStorage.getItem('bustrack_session')
        if (saved) {
            try {
                user.value = JSON.parse(saved)
                // Opcional: Verificar si el token sigue vivo aquí
            } catch (e) {
                console.error('Error cargando sesión', e)
                logout()
            }
        }
    }

    function restoreSession() {
        loadUserFromStorage()
        return user.value.isAuthenticated
    }

    // Acciones de actualización de perfil (Placeholder para futura implementación)
    function updateUser(updates) {
        user.value = { ...user.value, ...updates }
        saveSessionToStorage()
    }

    function updateCompanyInfo(updates) {
        user.value = { ...user.value, ...updates }
        saveSessionToStorage()
    }

    function updatePassword(newPassword) {
        // Aquí deberías llamar a un endpoint de cambio de contraseña
        console.log('Simulando cambio de password...')
    }

    return {
        // State
        user,
        
        // Getters
        isLoggedIn,
        isPassenger,
        isCompany,
        maskedEmail,
        maskedPassword,

        // Actions
        login,
        loginCompany,
        register,
        registerCompany,
        logout,
        loadUserFromStorage,
        restoreSession,
        updateUser,
        updateCompanyInfo,
        updatePassword
    }
})
