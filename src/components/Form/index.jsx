import React from 'react'
import { CForm } from './styled'
import { useFetch } from '../../hooks/useFetch'

const urlCounty = 'https://amazon-api.sellead.com/country'
const urlCity = 'https://amazon-api.sellead.com/city'

const Form = () => {
  const { data: dataCountry } = useFetch(urlCounty)
  const { data: dataCity } = useFetch(urlCity)

  return (
    <>
      <CForm action="">
        <div className="personal_data">
          <label>
            Nome:
            <br />
            <input type="text" name="name" placeholder="ex:Ally Silva" />
          </label>
          <label>
            Email:
            <br />
            <input type="email" name="email" placeholder="ex:ally@gmail.com" />
          </label>
          <label>
            Telefone:
            <br />
            <input type="tel" name="phone" placeholder="ex:(99)99999-9999" />
          </label>
          <label>
            CPF:
            <br />
            <input type="text" name="cpf" />
          </label>
        </div>

        <div className="places-data">
          <label>
            País:
            <br />
            <select name="selectACountry">
              {dataCountry &&
                dataCountry.map(({ code, name, name_ptbr }) => (
                  <option key={name} value={code}>
                    {name_ptbr}
                  </option>
                ))}
            </select>
          </label>

          <label>
            Cidade:
            <br />
            <select name="selectACity" >
              {dataCity &&
                dataCity.map(({ id, country_code, name_ptbr }) => (
                  <option key={id} value={country_code}>
                    {name_ptbr}
                  </option>
                ))}
            </select>
          </label>
        </div>
      </CForm>
    </>
  )
}

export default Form
