const { createContext } = require("react");

let BookContext = createContext();

export const UserProvider = ({ children }) => {


  return  (
   <BookContext.Provider>
    {children}
   </BookContext.Provider>
    )
}
export default BookContext;
