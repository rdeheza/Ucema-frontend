import { API_URL } from '../../env.json'

export const Constants = {
    apibaseurl: `https://ucema.edu.ar/proapp-test`,
    api: `/api`,
    getToken: `/getToken`,
    userdata: `/datosAlumno`,
    careerdata: `/carreraAlumno`,
    coursesdata: `/materiaAlumno`,
    examPermission: `/examenAlumno`,
    tutorName: `/tutorAlumno`,
    dayclasses: `/claseDelDiaAlumno`,
    classroomList: `/listaAulas`,
    canceledClasses: `/clasesCanceladas`,
    programmedClasses:`/clasesProgramadas`,
    exams: `/examenPorAlumno`,
    notes: `/notasPorAlumno`,
    getPushMessages: `/msgEnviados`,
    updatePushMessages: `/msgEnviados`,
    getPushToken: `/idAlumnoToken`,
    getPushMessagesTypes: `/msgTipos`,
    lastInvoices: `/ultimasFacturas`
}
export default Constants