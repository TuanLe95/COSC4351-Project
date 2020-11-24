import React from 'react';
import './Input.css'

const input = (props) => (
  <div className="">
    {props.label && <label htmlFor={props.id}>{props.label}</label>}
    {props.control === "input" && (
      <input
        className=""
        id={props.id}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        value={props.value}
        onChange={e => props.inputOnChangeHandler(props.id, e)}
        onBlur={e => props.inputOnBlurHandler(props.id)}
      />
    )}
  </div>
)

export default input;