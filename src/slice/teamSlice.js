import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users:[],
    domains:[]
}

export const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    add(state, action) {
        const user = action.payload;
        const domain = user.domain;
  
        if (state.domains.includes(domain)) {
          alert(`You can only add one user from the ${domain} domain.`);
        } else {
          state.users.push(user);
          state.domains.push(domain);
        }
      },
      remove(state, action) {
        const userIdToRemove = action.payload;
        state.users = state.users.filter(user => user.id !== userIdToRemove);
        state.domains = state.users.map(user => user.domain);
      }
      
  },
})

export const { add, remove} = teamSlice.actions

export default teamSlice.reducer