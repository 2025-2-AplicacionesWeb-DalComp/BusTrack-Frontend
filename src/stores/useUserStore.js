import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
    /**
     * Usuario actual autenticado (o estado vacío si no hay sesión).
     * @type {import('vue').Ref<User>}
     */
    const user = ref({
        username: '',
        email: '',
        password: '',
        isAuthenticated: false
    })

    /**
     * Lista de usuarios registrados en memoria (simulación "DB").
     * @type {import('vue').Ref<Array<Omit<User, 'isAuthenticated'>>>}
     */
    const registeredUsers = ref([])

    /**
     * Indica si existe una sesión activa.
     * @type {import('vue').ComputedRef<boolean>}
     */
    const isLoggedIn = computed(() => user.value.isAuthenticated)

    /**
     * Email enmascarado para UI (no expone valor completo).
     * @type {import('vue').ComputedRef<string>}
     */
    const maskedEmail = computed(() => {
        if (!user.value.email) return '••••••••••'
        const [name, domain] = user.value.email.split('@')
        if (!name || !domain) return '••••••••••'
        return `${name.slice(0, 2)}••••@${domain}`
    })

    /**
     * Contraseña enmascarada (placeholder fijo).
     * @type {import('vue').ComputedRef<string>}
     */
    const maskedPassword = computed(() => '••••••••••')

    /**
     * Intenta autenticar al usuario contra la "lista local" de registrados.
     * Coincide por username o email y valida password.
     *
     * @param {Credentials} credentials
     * @returns {boolean} true si autenticó, false si credenciales inválidas.
     */
    function login(credentials) {

        const foundUser = registeredUsers.value.find(u => {
            const matchesUsername = u.username === credentials.username
            const matchesEmail = u.email === credentials.email || u.email === credentials.username
            const matchesPassword = u.password === credentials.password

            return (matchesUsername || matchesEmail) && matchesPassword
        })

        if (foundUser) {

            user.value = {
                username: foundUser.username,
                email: foundUser.email,
                password: foundUser.password,
                isAuthenticated: true
            }

            // Guardar en localStorage
            localStorage.setItem('user', JSON.stringify(user.value))

            console.log('✅ Login exitoso:', { username: foundUser.username, email: foundUser.email })
            return true
        } else {
            console.log('❌ Login fallido: Usuario no encontrado o contraseña incorrecta')
            return false
        }
    }


    /**
     * Registra o actualiza un usuario dentro del "registro local".
     * Si existe por username o email, lo sobrescribe; si no, lo agrega.
     *
     * @param {RegisterPayload} userData
     * @returns {void}
     */
    function register(userData) {

        const newUser = {
            username: userData.username,
            email: userData.email,
            password: userData.password
        }


        const existingIndex = registeredUsers.value.findIndex(
            u => u.username === userData.username || u.email === userData.email
        )

        if (existingIndex !== -1) {
            registeredUsers.value[existingIndex] = newUser
            console.log('⚠️ Usuario actualizado:', newUser)
        } else {
            registeredUsers.value.push(newUser)
            console.log('✅ Usuario registrado:', newUser)
        }


        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value))
        console.log('📦 Total de usuarios registrados:', registeredUsers.value.length)
    }

    /**
     * Cierra la sesión del usuario actual y limpia el storage.
     * @returns {void}
     */
    function logout() {
        console.log('👋 Cerrando sesión de:', user.value.username)

        user.value = {
            username: '',
            email: '',
            password: '',
            isAuthenticated: false
        }


        localStorage.removeItem('user')
    }


    /**
     * Carga desde localStorage tanto el usuario actual como la lista de registrados.
     * Idempotente: puede llamarse en el arranque de la app.
     * @returns {void}
     */
    function loadUserFromStorage() {

        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            user.value = JSON.parse(savedUser)
            console.log('📂 Usuario cargado desde storage:', user.value.username)
        }


        const savedRegisteredUsers = localStorage.getItem('registeredUsers')
        if (savedRegisteredUsers) {
            registeredUsers.value = JSON.parse(savedRegisteredUsers)
            console.log('📂 Usuarios registrados cargados:', registeredUsers.value.length)
        }
    }

    /**
     * Actualiza datos del usuario autenticado y refleja el cambio en la lista.
     *
     * @param {Partial<RegisterPayload>} updates
     * @returns {void}
     */
    function updateUser(updates) {

        const oldEmail = user.value.email

        user.value = {
            ...user.value,
            username: updates.username || user.value.username,
            email: updates.email || user.value.email,
            password: updates.password || user.value.password
        }


        const userIndex = registeredUsers.value.findIndex(u => u.email === oldEmail)

        if (userIndex !== -1) {
            registeredUsers.value[userIndex] = {
                username: user.value.username,
                email: user.value.email,
                password: user.value.password
            }


            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers.value))
        }


        localStorage.setItem('user', JSON.stringify(user.value))

        console.log('✏️ Usuario actualizado:', user.value.username)
    }

    return {
        user,
        registeredUsers,
        isLoggedIn,
        maskedEmail,
        maskedPassword,
        login,
        register,
        logout,
        loadUserFromStorage,
        updateUser
    }
})
