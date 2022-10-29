import React, { useState } from 'react'
import { CForm, CAlert, CLabel, CInput, CContainer, CButton, CSelect} from './styled'

import Select from 'react-select'
// custom hook para request
import { useFetch } from '../../hooks/useFetch'
// HookForm e yup
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './validation'

// endpoints para request
const urlCounty = import.meta.env.VITE_COUNTRY
const urlCity = import.meta.env.VITE_CITY

function Form() {
  const [dataCity, setDataCity] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [selectedCities, setSelectedCities] = useState([])

  // Uso do custom hook useFetch
  const { data: dataCountry } = useFetch(urlCounty)
  const { data: dataCities } = useFetch(urlCity)

  // uso do hookForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (personalData) => {
    // recebe os dados do usuário e tambem os destinos inseridos no select
    console.log(personalData, { selectedCities, selectedCountry })
    // Estrutura para caso tivesse um backend:
    // -------------------------------------------------

    // limpar os campos do form
    reset({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      countrys: '',
      cities: '',
    })
  }

  // options que será exibido o usuário usando o react select
  const optionsCountrys =
    dataCountry &&
    dataCountry.map((country) => ({
      value: country.code,
      label: country.name,
    }))

  const optionsCities =
    dataCity &&
    dataCity.map((country) => ({
      value: country.country_code,
      label: country.name,
    }))

  //Função para filtrar as cidades por País no select cities
  const handleFilterCityByCountry = (e) => {
    setSelectedCountry(e)

    const filterCityByCode =
      dataCities &&
      dataCities.filter(({ country_code }) => {
        if (e.length === 0) {
          return dataCity
        }
        return country_code === e[e.length - 1].value
      })

    setDataCity(filterCityByCode)
  }

  return (
    <CContainer>
      <CForm action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="personal_data">
          <CLabel>
            Nome:
            <br />
            <CInput
              type="text"
              {...register('name')}
              placeholder="ex: Ally Hub"
            />
            <CAlert>{errors.name?.message}</CAlert>
          </CLabel>
          <CLabel>
            Email:
            <br />
            <CInput
              type="email"
              {...register('email')}
              placeholder="ex: ally@gmail.com"
            />
            <CAlert>{errors.email?.message}</CAlert>
          </CLabel>
          <CLabel>
            Telefone:
            <br />
            <CInput
              type="number"
              {...register('phone')}
              placeholder="ex: (99)99999-9999"
            />
            <CAlert>{errors.phone?.message}</CAlert>
          </CLabel>
          <CLabel>
            CPF:
            <br />
            <CInput type="number" {...register('cpf')} />
            <CAlert>{errors.cpf?.message}</CAlert>
          </CLabel>
        </div>

        <div className="places_data">
          <CLabel>
            País:
            <br />
            <Select
              {...register('countrys')}
              className="select"
              options={optionsCountrys}
              isMulti
              onChange={handleFilterCityByCountry}
            />
            <CAlert>{errors.countrys?.message}</CAlert>
          </CLabel>

          <CLabel>
            Cidade:
            <br />
            <Select
              {...register('cities')}
              className="select"
              options={optionsCities}
              isMulti
              onChange={(e) => setSelectedCities(e)}
            />
            <CAlert>{errors.cities?.message}</CAlert>
          </CLabel>
        </div>
        <CButton>Enviar</CButton>
      </CForm>
    </CContainer>
  )
}

export default Form
