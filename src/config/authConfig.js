export const authConfig= {
    headers: {
      "x-auth": localStorage.getItem('token'),
    },
  }