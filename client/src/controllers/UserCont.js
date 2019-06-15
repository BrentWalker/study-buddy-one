import axios from 'axios'

const userCont = {
   getAll: async () => {
       let response = await axios.get('/api/v1/users/')
       return response.data
   },
   get: async (id) => {
       let response = await axios.get(`/api/v1/users/${id}/`)
       return response.data
   },
   create: async (usercont) => {
       console.log(userprofile)
       let response = await axios.post('/api/v1/users/', usercont)
       console.log(response.data)
       return response.data
   },
   update: async (usercont) => {
       let response = await axios.patch(`/api/v1/users/${usercont.id}/`, usercont)
       return response.data
   },
   delete: async (id) => {
       let response = await axios.delete(`/api/v1/users/${id}/`)
       return response.data
   }
}
export default userCont