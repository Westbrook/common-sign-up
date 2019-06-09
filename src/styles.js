import { css } from 'lit-element';

export const styles = css`
  :host {
    display: flex;
    padding: 20px 0;
  }

  form {
    width: 100%;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
  }

  .main-title {
    margin: 0 0 40px;
    padding: 0;
    font-weight: bold;
    font-size: 1.7em;
  }

  .sub-title {
    margin: 0 0 20px;
    font-size: 1.3em;
    font-weight: bold;
  }

  label {
    display: block;
    margin: 0 0 20px;
  }

  input,
  select,
  button {
    display: block;
    width: 100%;
    margin: 10px 0 0;
    border: 1px solid;
    padding: 5px 15px;
    box-sizing: border-box;
    border-radius: 0;
    height: 40px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }

  span {
    display: none;
    color: red;
    font-style: italic;
    padding: 5px 0 0;
  }

  [focused]:invalid + span {
    display: block;
  }

  button {
    float: right;
    width: auto;
  }

  .back {
    float: left;
  }

  dl {
    margin: 0;
  }

  dt {
    float: left;
    margin-right: 10px;
  }

  dd {
    margin: 0;
  }

  .main-data {
    font-size: 1.2em;
    font-weight: bold;
    width: 100%;
  }

  dd + .main-data {
    margin-top: 20px;
  }
`;
