import React, { useState } from "react";

 const Form = ({ addTodo }) => {
   const [value, setValue] = useState("");
   
   const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };

   return (
     <form onSubmit={handleSubmit}>
        <input
          value={value}
          type="text"
          onChange={e => setValue(e.target.value)}
          placeholder="Add a todo"
        />
      </form>
   );
 };

 export default Form;