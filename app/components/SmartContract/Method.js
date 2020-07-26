import React, { useState } from "react";

const Method = ({ type, name, stateMutability, inputs, contract, outputs }) => {
  const [res, setRes] = useState([]);
  const [values, setValues] = useState({ val: [] });

  function handleChange(event) {
    let vals = [...values.val];
    vals[this] = event.target.value;
    setValues({ val: vals });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    contract[name].apply(null, values.val).then((res) => {
      setRes(res);
    });
  };

  return (
    <div className="card" style={{ marginBottom: 10 }}>
      <div className="card-header">{name}</div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-row align-items-center">
            {inputs.map((input, i) => (
              <div className="col-sm-3">
                <input
                  type="text"
                  className="form-control"
                  id={input.name}
                  placeholder={input.name}
                  onChange={handleChange.bind(i)}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary">
              {name}
            </button>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">{JSON.stringify(res)}</div>
    </div>
  );
};

export default Method;
