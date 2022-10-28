import React, { useState } from 'react'
import { CForm, CAlert, CLabel, CInput, CContainer, CButton } from './styled'
import { useFetch } from '../../hooks/useFetch'

// HookForm e yup
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

// endpoints para request
const urlCounty = 'https://amazon-api.sellead.com/country'
const urlCity = 'https://amazon-api.sellead.com/city'

//Criando esquema para as validações
const schema = yup
  .object({
    name: yup.string().required('Campo Obrigatório'),
    email: yup
      .string()
      .email('Insira um email válido')
      .required('Campo Obrigatório'),
    phone: yup.string().required('insira um número válido'),
    cpf: yup
      .string()
      .max(11, 'O maximo de um cpf são 11 números')
      .min(11, 'O minimo de um cpf são 11 números')
      .required('Insira um cpf válido'),
  })
  .required()


function Form() {
  const [dataCity, setDataCity] = useState([])
  

  // Uso do custom hook
  const { data: dataCountry } = useFetch(urlCounty)
  const { data: dataCities } = useFetch(urlCity)

  //Função para filtrar as cidades por País
  const handleFilterCityByCountry = (e) => {
    const codeCountry = e.target.value
    const filterCityByCode = dataCities.filter(
      ({ country_code }) => country_code === codeCountry
    )

    setDataCity(filterCityByCode)
  }

  // uso do hookForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => console.log(data)

  return (
    <CContainer>
      <CForm action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="personal_data">
          <CLabel>
            Nome:
            <br />
            <CInput
              type="text"
              name="name" 
              defaultValue=""
              {...register('name')}
              placeholder="ex:Ally Hub"
            />
            <CAlert>{errors.name?.message}</CAlert>
          </CLabel>
          <CLabel>
            Email:
            <br />
            <CInput
              type="email"
              name="email"
              {...register('email')}
              placeholder="ex:ally@gmail.com"
            />
            <CAlert>{errors.email?.message}</CAlert>
          </CLabel>
          <CLabel>
            Telefone:
            <br />
            <CInput
              type="tel"
              name="phone"
              {...register('phone')}
              placeholder="ex:(99)99999-9999"
            />
            <CAlert>{errors.phone?.message}</CAlert>
          </CLabel>
          <CLabel>
            CPF:
            <br />
            <CInput type="number" name="cpf" {...register('cpf')} />
            <CAlert>{errors.cpf?.message}</CAlert>
          </CLabel>
        </div>

        <div className="places_data">
          <CLabel>
            País:
            <br />
            <select
              onInput={handleFilterCityByCountry}
              name="selectACountry"
              {...register('countrys')}
            >
              {dataCountry &&
                dataCountry.map(({ code, name, name_ptbr }) => (
                  <option key={name} value={code}>
                    {name_ptbr}
                  </option>
                ))}
            </select>
          </CLabel>

          <CLabel>
            Cidade:
            <br />
            <select name="selectACity" {...register('cities')}>
              {!dataCity || dataCity.length === 0 ? (
                <option value="">Sem destino para esse País </option>
              ) : (
                dataCity.map(({ id, country_code, name }) => (
                  <option key={id} value={country_code}>
                    {name}
                  </option>
                ))
              )}
            </select>
          </CLabel>
        </div>
        <CButton>Enviar</CButton>
      </CForm>
    </CContainer>
  )
}

export default Form
