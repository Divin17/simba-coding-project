const logout = () => {
   try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
         status: true,
         message: 'Success',
      };
   } catch (error) {
      return {
         status: false,
         message: 'something unexpected happened',
         data: error,
      };
   }
};

export default logout;
