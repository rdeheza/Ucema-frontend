import create from 'zustand';
import getData from '../shared/services/getData'
import getUserCareers from '../shared/services/Career/Career'

const useStore = create((set, get) => ({
    careers: [],
    careersFullModel: [],
    careerSelected: "",
    isLoading: true,
    token: "",
    userLogged: "",
    forceCloseApp: false,
    fetchCarrers: (userId, token, userLogged) => {
        let comboCarreras = [];
        let carrerasFull = [];
        getUserCareers(userId, token, userLogged)
            .then( carreras => {

                if (carreras.length > 0) { 

                    set({ isLoading: true }) // habilito el loading

                    carreras.map( carrera => {
                        carrerasFull.push(carrera);
                        comboCarreras.push({
                            value: carrera.descred,
                            label: carrera.descrip
                        })
                    })

                    set({ careers: comboCarreras })
                    set({ careerSelected: comboCarreras[0].value })
                    
                    // guardo el modelo completo de las carreas
                    set({ careersFullModel: carrerasFull })

                    setTimeout(() => {
                        set({ isLoading: false }) // deshabilito el loading
                    }, 2000);
                }
            })
            .catch( () => {
                console.log("Sali por error en Careers")
                set({ forceCloseApp: true })
            })
    },
    setCareer: (career) => {
        set({ isLoading: true }) // habilito el loading
        set({ careerSelected: career }) // cambio carrera seleccionada

        setTimeout(() => {
            set({ isLoading: false }) // habilito el loading
        }, 2000);
    },
    cleanCareers: () => {
        set({ careers: [] })
    },
    cleanCareersFullModel: () => {
        set({ careersFullModel: [] })
    },
    setLoading: (status) => {
        set({ isLoading: status }) // manipulacion del loading
    },
    setUserLogged: (user) => {
        set({ userLogged: user })
    },
    setToken: (token) => {
        set({ token: token })
    },
    cleanForceCloseApp: () => {
        console.log("llame al cleanForceCloseApp")
        set({ forceCloseApp: false })
    },
    setForceCloseApp: () => {
        set({ forceCloseApp: true })
    }
}))

export default useStore;




        

        
