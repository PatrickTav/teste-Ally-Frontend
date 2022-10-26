import React from 'react'

const Form = () => {
  return (
    <>
      <form action="">
        <div>
          <label>
            Nome:
            <input type="text" name="name" />
          </label>
          <label>
            email:
            <input type="email" name="email" />
          </label>
          <label>
            Telefone:
            <input type="tel" name="phone" />
          </label>
          <label>
            cpf:
            <input type="text" name="cpf" />
          </label>
        </div>
        <div>
          <label>
            País:
            <select name="selectACountry" id="">
                <option value="AP">alsdk</option>
            </select>
          </label>
          <label>
            Cidade:
            <select name="selectACity" id="">
                <option value="AP">alsdk</option>
            </select>
          </label>
        </div>
      </form>
    </>
  )
}

export default Form